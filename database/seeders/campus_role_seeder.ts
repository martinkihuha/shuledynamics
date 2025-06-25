import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Database from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const campusRoleData = [
      {
        campus_id: 1,
        role_id: 1,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_id: 1,
        role_id: 2,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_id: 1,
        role_id: 3,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_id: 1,
        role_id: 4,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_id: 1,
        role_id: 5,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_id: 1,
        role_id: 6,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_id: 1,
        role_id: 7,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_id: 2,
        role_id: 1,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_id: 2,
        role_id: 2,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_id: 2,
        role_id: 3,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_id: 2,
        role_id: 4,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_id: 2,
        role_id: 5,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_id: 2,
        role_id: 6,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_id: 2,
        role_id: 7,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
    ]

    await Database.table('campus_role').multiInsert(campusRoleData)
  }
}
