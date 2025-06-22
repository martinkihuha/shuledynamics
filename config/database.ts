import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: env.get('DB_CONNECTION') || 'landlord_db',

  connections: {
    landlord_db: {
      client: 'pg',
      connection: {
        host: env.get('LL_DB_HOST'),
        port: Number(env.get('LL_DB_PORT')),
        user: env.get('LL_DB_USER'),
        password: env.get('LL_DB_PASW'),
        database: env.get('LL_DB_NAME'),
      },
      pool: {
        min: 1,
        max: 1,
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations/landlord_db'],
        disableRollbacksInProduction: true,
      },
      seeders: {
        paths: ['./database/seeders/landlord'],
      },
    },

    tenant_db: {
      client: 'pg',
      connection: {
        host: env.get('TT_DB_HOST'),
        port: Number(env.get('TT_DB_PORT')),
        user: env.get('TT_DB_USER'),
        password: env.get('TT_DB_PASW', ''),
        database: env.get('TT_DB_NAME'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations/tenant_db'],
        disableRollbacksInProduction: true,
      },
      debug: false,
      seeders: {
        paths: ['./database/seeders/tenant'],
      },
    },
  },
})

export default dbConfig
