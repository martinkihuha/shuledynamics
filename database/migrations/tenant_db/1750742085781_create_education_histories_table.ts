import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'education_histories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('county_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('counties')
        .onDelete('CASCADE')
      table
        .integer('student_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('students')
        .onDelete('CASCADE')
      table.string('school_name').notNullable()
      table.string('year_of_admission', 4).notNullable()
      table.string('year_of_departure', 4).notNullable()
      table.string('class_of_departure', 50).notNullable()
      table.string('departure_reason').notNullable()
      table.string('leaving_certificate').notNullable()
      table.boolean('extra_activities').defaultTo(false)

      table.timestamp('deleted_at').nullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
