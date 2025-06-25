import Tenant from '#models/tenant'
import { BaseCommand, flags } from '@adonisjs/core/ace'
import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { MigrationRunner } from '@adonisjs/lucid/migration'

export default class TenantRollback extends BaseCommand {
  static commandName = 'tenant:rollback'
  static description = 'Rollback single or multiple client databases'

  @flags.string({ description: 'Shortname of the tenant to migrate' })
  declare shortname?: string

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
       * Rollback single tenant database
       */
      await this.rollback(tenant)

      return
    }

    const tenants = await Tenant.query().orderBy('id', 'asc')

    if (!tenants || !tenants.length) {
      this.logger.error('No tenant databases found! Please add tenants in the landlord DB.')
      return
    }

    /**
     * Rollback multiple tenant databases
     */
    for (const [index, tenant] of tenants.entries()) {
      if (index) console.log('') // Line break
      await this.rollback(tenant)
    }
  }

  /**
   * Rollback database for specified client
   */
  private async rollback(tenant: Tenant) {
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
      direction: 'down',
      dryRun: false,
      connectionName: 'tenant_db',
    })

    await migrator.run()

    this.logger.info(`Rolling back tenant #${tenant?.id} (${tenant?.shortname})`)

    for (const migratedFile in migrator?.migratedFiles) {
      const status =
        migrator?.migratedFiles[migratedFile].status === 'completed'
          ? 'rolled back'
          : migrator?.migratedFiles[migratedFile].status
      console.log(
        '\x1b[33m%s\x1b[0m',
        `[${status}]`,
        migrator?.migratedFiles[migratedFile]?.file?.name
      )
    }
  }
}
