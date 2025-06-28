import Curriculum from '#models/curriculum'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
// import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const uniqueKey = 'name'

    await Curriculum.updateOrCreateMany(uniqueKey, [
      { name: 'C.B.C.' },
      { name: 'I.G.C.S.E.' },
      // { name: '8-4-4', deletedAt: DateTime.local() },
      { name: '8-4-4' },
    ])
  }
}
