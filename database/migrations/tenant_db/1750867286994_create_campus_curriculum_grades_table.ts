import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'campus_curriculum_grades'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('campus_curriculum_id')
        .unsigned()
        .references('id')
        .inTable('campus_curriculum')
        .onDelete('CASCADE')
      table
        .integer('curriculum_id')
        .unsigned()
        .references('id')
        .inTable('curricula')
        .onDelete('CASCADE')
      table.integer('grade_id').unsigned().references('id').inTable('grades').onDelete('CASCADE')

      table.timestamp('deleted_at').nullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()

      // Add unique constraint
      table.unique(['campus_curriculum_id', 'curriculum_id', 'grade_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
