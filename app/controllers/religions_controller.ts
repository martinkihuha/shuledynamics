import Religion from '#models/religion'
import type { HttpContext } from '@adonisjs/core/http'

export default class ReligionsController {
  async index({ response }: HttpContext) {
    const results = await Religion.query().whereNull('deletedAt').orderBy('id')
    return response.json(results)
  }
}
