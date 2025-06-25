import Salutation from '#models/salutation'
import type { HttpContext } from '@adonisjs/core/http'

export default class SalutationsController {
  async index({ response }: HttpContext) {
    const results = await Salutation.query().whereNull('deletedAt').orderBy('id')
    return response.json(results)
  }
}
