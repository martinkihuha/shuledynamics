import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'students'

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
        .integer('curriculum_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('curricula')
        .onDelete('CASCADE')
      table
        .integer('gender_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('genders')
        .onDelete('CASCADE')
      table
        .integer('grade_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('grades')
        .onDelete('CASCADE')
      table
        .integer('religion_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('religions')
        .onDelete('CASCADE')
      table
        .integer('stream_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('streams')
        .onDelete('CASCADE')
      table
        .integer('student_status_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('student_statuses')
        .onDelete('CASCADE')
      table.string('admission_no', 20).notNullable()
      table.string('name', 20).notNullable()
      table.string('dob', 10).notNullable()
      table.string('nemis_no', 20).notNullable()
      table.string('date_of_admission', 10).notNullable()

      table.timestamp('deleted_at').nullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
