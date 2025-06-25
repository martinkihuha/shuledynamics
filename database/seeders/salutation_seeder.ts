import Salutation from '#models/salutation'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const uniqueKey = 'name'

    await Salutation.updateOrCreateMany(uniqueKey, [
      { name: 'Mr.' },
      { name: 'Mrs.' },
      { name: 'Ms.' },
      { name: 'Dr.' },
    ])
  }
}
