import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'staff_members'

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
        .integer('gender_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('genders')
        .onDelete('CASCADE')
      table
        .integer('religion_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('religions')
        .onDelete('CASCADE')
      table
        .integer('salutation_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('salutations')
        .onDelete('CASCADE')
      table.string('national_id').notNullable().defaultTo('')
      table.string('name').notNullable().defaultTo('')
      table.string('email').notNullable().defaultTo('')
      table.string('mobile').notNullable().defaultTo('')
      table.string('location').notNullable().defaultTo('')
      table.string('postal_address').nullable().defaultTo('')
      table.string('postal_code').nullable().defaultTo('')
      table.string('pin_number').nullable().defaultTo('')
      table.string('nssf_number').nullable().defaultTo('')
      table.string('shif_number').nullable().defaultTo('')

      table.timestamp('deleted_at').nullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
