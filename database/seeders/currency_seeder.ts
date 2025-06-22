import Currency from '#models/currency'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const uniqueKey = 'symbol'

    await Currency.updateOrCreateMany(uniqueKey, [
      { symbol: 'KES' },
      { symbol: 'USD' },
      { symbol: 'GBP' },
      { symbol: 'EUR' },
    ])
  }
}
