import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tenants'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('shortname').notNullable()
      table.string('fullname').notNullable()
      table.string('db_host').notNullable().defaultTo('127.0.0.1')
      table.string('db_port').notNullable().defaultTo(5432)
      table.string('db_name').notNullable()
      table.string('db_user').notNullable()
      table.string('db_pasw').nullable()
      table.string('motto').nullable()
      table.string('phone').nullable()
      table.string('email').nullable()
      table.string('website').nullable()
      table.string('physical_address').nullable()
      table.string('postal_address').nullable()
      table.string('postal_code').nullable()
      table.string('city').nullable()
      table.text('logo_url').nullable()

      table.timestamp('deleted_at', { useTz: true }).nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
