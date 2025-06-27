import DepartureReason from '#models/departure_reason'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const uniqueKey = 'name'

    await DepartureReason.updateOrCreateMany(uniqueKey, [
      { name: 'Family relocation' },
      { name: 'Lack of facilities' },
      { name: 'Finances' },
      { name: 'Scholarship opportunities' },
      { name: 'Change of curriculum' },
    ])
  }
}
