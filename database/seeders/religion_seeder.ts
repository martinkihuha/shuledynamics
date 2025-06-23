import Religion from '#models/religion'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const uniqueKey = 'name'

    await Religion.updateOrCreateMany(uniqueKey, [
      { name: 'Christianity' },
      { name: 'Islam' },
      { name: 'Hindu' },
      { name: 'Other' },
    ])
  }
}
