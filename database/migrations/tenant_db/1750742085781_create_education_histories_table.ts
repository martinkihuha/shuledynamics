import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'education_histories'

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
        .integer('county_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('counties')
        .onDelete('CASCADE')
      table
        .integer('curriculum_id')
        .unsigned()
        .references('id')
        .inTable('curricula')
        .onDelete('CASCADE')
      table
        .integer('departure_reason_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('departure_reasons')
        .onDelete('CASCADE')
      table
        .integer('grade_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('grades')
        .onDelete('CASCADE')
      table
        .integer('student_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('students')
        .onDelete('CASCADE')
      table.string('school_name').notNullable()
      table.timestamp('date_of_admission').notNullable()
      table.timestamp('date_of_departure').notNullable()
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
