import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Database from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const campusCurriculumData = [
      {
        campus_id: 1,
        curriculum_id: 1,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_id: 1,
        curriculum_id: 2,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_id: 2,
        curriculum_id: 1,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_id: 2,
        curriculum_id: 3,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
    ]

    await Database.table('campus_curriculum').multiInsert(campusCurriculumData)
  }
}
