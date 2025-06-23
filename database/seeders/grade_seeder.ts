import Grade from '#models/grade'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const uniqueKey = 'name'

    await Grade.updateOrCreateMany(uniqueKey, [
      { curriculumId: 1, name: 'PP1' },
      { curriculumId: 1, name: 'PP2' },
      { curriculumId: 1, name: 'Grade 1' },
      { curriculumId: 1, name: 'Grade 2' },
      { curriculumId: 1, name: 'Grade 3' },
      { curriculumId: 1, name: 'Grade 4' },
      { curriculumId: 1, name: 'Grade 5' },
      { curriculumId: 1, name: 'Grade 6' },
      { curriculumId: 1, name: 'Grade 7' },
      { curriculumId: 1, name: 'Grade 8' },
      { curriculumId: 1, name: 'Grade 9' },
      { curriculumId: 1, name: 'Grade 10' },
      { curriculumId: 1, name: 'Grade 11' },
      { curriculumId: 1, name: 'Grade 12' },
      { curriculumId: 2, name: 'Kindergarten 1' },
      { curriculumId: 2, name: 'Kindergarten 2' },
      { curriculumId: 2, name: 'Year 1' },
      { curriculumId: 2, name: 'Year 2' },
      { curriculumId: 2, name: 'Year 3' },
      { curriculumId: 2, name: 'Year 4' },
      { curriculumId: 2, name: 'Year 5' },
      { curriculumId: 2, name: 'Year 6' },
      { curriculumId: 2, name: 'Year 7' },
      { curriculumId: 2, name: 'Year 8' },
      { curriculumId: 2, name: 'Year 9' },
      { curriculumId: 2, name: 'Year 10' },
      { curriculumId: 2, name: 'Year 11' },
      { curriculumId: 2, name: 'Year 12' },
      { curriculumId: 2, name: 'Year 13' },
      { curriculumId: 2, name: 'BTEC' },
      { curriculumId: 3, name: 'Nursery' },
      { curriculumId: 3, name: 'Pre-Unit' },
      { curriculumId: 3, name: 'Standard 1' },
      { curriculumId: 3, name: 'Standard 2' },
      { curriculumId: 3, name: 'Standard 3' },
      { curriculumId: 3, name: 'Standard 4' },
      { curriculumId: 3, name: 'Standard 5' },
      { curriculumId: 3, name: 'Standard 6' },
      { curriculumId: 3, name: 'Standard 7' },
      { curriculumId: 3, name: 'Standard 8' },
      { curriculumId: 3, name: 'Form 1' },
      { curriculumId: 3, name: 'Form 2' },
      { curriculumId: 3, name: 'Form 3' },
      { curriculumId: 3, name: 'Form 4' },
    ])
  }
}
