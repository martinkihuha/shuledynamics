import TenantSeeder from '#database/seeders/main/index_seeder'
import Tenant from '#models/tenant'
import { BaseCommand } from '@adonisjs/core/ace'

import db from '@adonisjs/lucid/services/db'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class TenantSeed extends BaseCommand {
  declare shortname?: string
  static commandName = 'tenant:seed'
  static description = 'Seed data into tenant databases'

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
       * Seed single tenant database
       */
      await this.seed(tenant)

      return
    }

    const tenants = await Tenant.query().orderBy('id', 'asc')

    if (!tenants || !tenants.length) {
      this.logger.error('No tenant databases found! Please add tenants in the landlord DB.')
      return
    }

    /**
     * Seed multiple tenant databases
     */
    for (const [index, tenant] of tenants.entries()) {
      if (index) console.log('') // Line break
      await this.seed(tenant)
    }
  }

  /**
   * Seed database for specified client
   */
  private async seed(tenant: Tenant) {
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

    // Get the specific database connection for the tenant
    const tenantDbConnection = db.connection('tenant_db')
    // Pass the database connection instance to the seeder constructor
    const seeder = new TenantSeeder(tenantDbConnection)
    await seeder.run()

    this.logger.info(`Seeding into tenant #${tenant?.id} (${tenant?.shortname})`)
  }
}
