import Tenant from '#models/tenant'
import { BaseCommand } from '@adonisjs/core/ace'
import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { MigrationRunner } from '@adonisjs/lucid/migration'

export default class TenantMigrate extends BaseCommand {
  declare shortname?: string
  static commandName = 'tenant:migrate'
  static description = 'Migrate single or multiple tenant databases'

  static options: CommandOptions = {
    startApp: true,
    staysAlive: false,
  }

  async run() {
    if (this.shortname) {
      const tenant = await Tenant.findBy('shortname', this.shortname)

      if (!tenant) {
        this.logger.error('No tenant database found!')
        return
      }

      /**
       * Migrate single tenant database
       */
      await this.migrate(tenant)

      return
    }

    const tenants = await Tenant.query().orderBy('id', 'asc')

    if (!tenants || !tenants.length) {
      this.logger.error('No tenant databases found! Please add tenants in the landlord DB.')
      return
    }

    /**
     * Migrate multiple tenant databases
     */
    for (const [index, tenant] of tenants.entries()) {
      if (index) console.log('') // Line break
      await this.migrate(tenant)
    }
  }

  /**
   * Migrate database for specified client
   */
  private async migrate(tenant: Tenant) {
    db.manager.patch('tenant_db', {
      client: 'pg',
      connection: {
        host: tenant.dbHost,
        port: Number(tenant.dbPort),
        user: tenant.dbUser,
        password: tenant.dbPasw,
        database: tenant.dbName,
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations/tenant_db'],
      },
      debug: false,
      seeders: {
        paths: ['./database/seeders/tenant'],
      },
    })

    db.manager.connect('tenant_db')

    const migrator = new MigrationRunner(db, app, {
      direction: 'up',
      dryRun: false,
      connectionName: 'tenant_db',
    })

    await migrator.run()

    this.logger.info(`Migrating tenant #${tenant?.id} (${tenant?.shortname})`)

    for (const migratedFile in migrator?.migratedFiles) {
      const status =
        migrator?.migratedFiles[migratedFile].status === 'completed'
          ? 'migrated'
          : migrator?.migratedFiles[migratedFile].status
      console.log(
        '\x1b[33m%s\x1b[0m',
        `[${status}]`,
        migrator?.migratedFiles[migratedFile]?.file?.name
      )
    }
  }
}
