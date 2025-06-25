import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'campuses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('country_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('countries')
        .onDelete('CASCADE')
      table
        .integer('county_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('counties')
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('phone1').nullable()
      table.string('phone2').nullable()
      table.string('email').nullable()
      table.string('website').nullable()
      table.string('physical_address').nullable()
      table.string('postal_address').nullable()
      table.string('postal_code').nullable()
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
