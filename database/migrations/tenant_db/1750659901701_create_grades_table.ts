import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'grades'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('curriculum_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('curricula')
        .onDelete('CASCADE')
      table.string('name', 20).notNullable()
      table.text('description').nullable()

      table.timestamp('deleted_at').nullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
