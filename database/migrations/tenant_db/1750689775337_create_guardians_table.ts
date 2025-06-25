import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'guardians'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('campus_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('campuses')
        .onDelete('CASCADE')
      table
        .integer('country_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('countries')
        .onDelete('CASCADE')
      table
        .integer('relationship_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('relationships')
        .onDelete('CASCADE')
      table
        .integer('religion_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('religions')
        .onDelete('CASCADE')
      table.string('national_id').notNullable().defaultTo('')
      table.string('name').notNullable().defaultTo('')
      table.string('email').notNullable().defaultTo('')
      table.string('mobile').notNullable().defaultTo('')
      table.string('location').notNullable().defaultTo('')
      table.text('notes').nullable().defaultTo('')

      table.timestamp('deleted_at').nullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
