import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'staff_educations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('staff_member_id')
        .unsigned()
        .references('id')
        .inTable('staff_members')
        .onDelete('CASCADE')
      table.string('institution').notNullable()
      table.string('qualification').notNullable()
      table.timestamp('start_date').notNullable()
      table.timestamp('end_date').notNullable()

      table.timestamp('deleted_at').nullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
