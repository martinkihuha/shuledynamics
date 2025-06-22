import Tenant from '#models/tenant'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import db from '@adonisjs/lucid/services/db'

export default class SwitchTenantMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    let instance = ctx?.request?.host()

    if (!instance) {
      throw new Error('Invalid host')
    }

    if (instance === '127.0.0.1:3333' || instance === 'localhost:3333') {
      instance = 'shule2'
    } else {
      instance = instance.split('.')[0]
    }

    // Store tenant data using Inertia share if available
    if (ctx.inertia) {
      const school = await Tenant.query().where('shortname', instance).firstOrFail()
      ctx.inertia.share({ instance, school })
    }

    const tenant = await Tenant.findBy('shortname', instance)

    if (!tenant) {
      throw new Error('Tenant not found')
    }

    const conn = db.manager.get('tenant_db')

    // Check if the connection config is an object and has the database property before accessing it
    const connectionConfig = conn?.config?.connection
    const currentDbName =
      typeof connectionConfig === 'object' &&
      connectionConfig !== null &&
      'database' in connectionConfig
        ? connectionConfig.database
        : null

    if (!conn?.connection || currentDbName !== tenant?.dbName) {
      db.manager.patch('tenant_db', {
        client: 'pg',
        connection: {
          host: tenant.dbHost,
          port: Number(tenant.dbPort),
          user: tenant.dbUser,
          password: tenant.dbPasw,
          database: tenant.dbName,
        },
        debug: false,
      })

      await db.manager.connect('tenant_db')
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
