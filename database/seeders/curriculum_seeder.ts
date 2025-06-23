import Curriculum from '#models/curriculum'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const uniqueKey = 'name'

    await Curriculum.updateOrCreateMany(uniqueKey, [
      { name: 'CBC' },
      { name: 'IGCSE' },
      { name: '8-4-4' },
    ])
  }
}
