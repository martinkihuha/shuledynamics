import Currency from '#models/currency'
import type { HttpContext } from '@adonisjs/core/http'

export default class CurrenciesController {
  async index({ response }: HttpContext) {
    const results = await Currency.query().whereNull('deletedAt').orderBy('id')
    return response.json(results)
  }
}
