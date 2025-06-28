import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'staff_emergency_contacts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('staff_member_id')
        .unsigned()
        .references('id')
        .inTable('staff_members')
        .onDelete('CASCADE')
      table
        .integer('relationship_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('relationships')
        .onDelete('CASCADE')
      table.string('name').notNullable().defaultTo('')
      table.string('mobile').notNullable().defaultTo('')
      table.string('email').nullable().defaultTo('')

      table.timestamp('deleted_at').nullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
