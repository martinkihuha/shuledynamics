import County from '#models/county'
import type { HttpContext } from '@adonisjs/core/http'

export default class CountiesController {
  async index({ response }: HttpContext) {
    const results = await County.query().whereNull('deletedAt').orderBy('id')
    return response.json(results)
  }
}
