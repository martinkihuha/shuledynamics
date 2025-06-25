import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'academic_terms'

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
        .integer('academic_year_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('academic_years')
        .onDelete('CASCADE')
      table.string('name').notNullable().defaultTo('')
      table.string('startDate').nullable()
      table.string('endDate').nullable()
      table.string('midtermStartDate').nullable()
      table.string('midtermEndDate').nullable()
      table.boolean('isCurrent').notNullable().defaultTo(false)

      table.timestamp('deleted_at').nullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
