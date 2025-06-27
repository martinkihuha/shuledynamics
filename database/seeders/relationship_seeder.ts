import Relationship from '#models/relationship'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const uniqueKey = 'name'

    await Relationship.updateOrCreateMany(uniqueKey, [
      { name: 'Father' },
      { name: 'Mother' },
      { name: 'Brother' },
      { name: 'Sister' },
      { name: 'Grandfather' },
      { name: 'Grandmother' },
      { name: 'Uncle' },
      { name: 'Aunt' },
      { name: 'Cousin' },
      { name: 'Sponsor' },
      { name: 'Other', deletedAt: DateTime.now() },
    ])
  }
}
