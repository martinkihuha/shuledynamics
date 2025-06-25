import Curriculum from '#models/curriculum'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
// import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const uniqueKey = 'name'

    await Curriculum.updateOrCreateMany(uniqueKey, [
      { name: 'CBC', deletedAt: null },
      { name: 'IGCSE', deletedAt: null },
      // { name: '8-4-4', deletedAt: DateTime.local() },
      { name: '8-4-4', deletedAt: null },
    ])
  }
}
