import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'system_tabs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('parent').notNullable()
      table.string('title').notNullable()
      table.string('description').nullable().defaultTo('')
      table.string('url').nullable().defaultTo('')
      table.string('icon').nullable().defaultTo('')
      table.string('icon_solid').nullable().defaultTo('')
      table.string('btn_text').nullable().defaultTo('')
      table.integer('list_order', 3).defaultTo(0)

      table.timestamp('deleted_at').nullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
