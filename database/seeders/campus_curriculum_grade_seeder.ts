import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Database from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const campusCurriculumGradesData = [
      {
        campus_curriculum_id: 1,
        curriculum_id: 1,
        grade_id: 1,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_curriculum_id: 1,
        curriculum_id: 1,
        grade_id: 2,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_curriculum_id: 1,
        curriculum_id: 1,
        grade_id: 3,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_curriculum_id: 1,
        curriculum_id: 1,
        grade_id: 4,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_curriculum_id: 1,
        curriculum_id: 1,
        grade_id: 5,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_curriculum_id: 1,
        curriculum_id: 1,
        grade_id: 6,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_curriculum_id: 1,
        curriculum_id: 1,
        grade_id: 7,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_curriculum_id: 1,
        curriculum_id: 1,
        grade_id: 8,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_curriculum_id: 2,
        curriculum_id: 2,
        grade_id: 15,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_curriculum_id: 2,
        curriculum_id: 2,
        grade_id: 16,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_curriculum_id: 2,
        curriculum_id: 2,
        grade_id: 17,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_curriculum_id: 2,
        curriculum_id: 2,
        grade_id: 18,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_curriculum_id: 2,
        curriculum_id: 2,
        grade_id: 19,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_curriculum_id: 2,
        curriculum_id: 2,
        grade_id: 20,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_curriculum_id: 2,
        curriculum_id: 2,
        grade_id: 21,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_curriculum_id: 2,
        curriculum_id: 2,
        grade_id: 22,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_curriculum_id: 4,
        curriculum_id: 3,
        grade_id: 41,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_curriculum_id: 4,
        curriculum_id: 3,
        grade_id: 42,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_curriculum_id: 4,
        curriculum_id: 3,
        grade_id: 43,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
      {
        campus_curriculum_id: 4,
        curriculum_id: 3,
        grade_id: 44,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      },
    ]

    await Database.table('campus_curriculum_grades').multiInsert(campusCurriculumGradesData)
  }
}
