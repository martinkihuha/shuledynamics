import Stream from '#models/stream'
import type { HttpContext } from '@adonisjs/core/http'

export default class StreamsController {
  async index({ response }: HttpContext) {
    const results = await Stream.query().whereNull('deletedAt').orderBy('id')
    return response.json(results)
  }
}
