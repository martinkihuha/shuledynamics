import DepartureReason from '#models/departure_reason'
import type { HttpContext } from '@adonisjs/core/http'

export default class DepartureReasonsController {
  async index({ response }: HttpContext) {
    const results = await DepartureReason.query().whereNull('deletedAt').orderBy('id')
    return response.json(results)
  }
}
