import Grade from '#models/grade'
import type { HttpContext } from '@adonisjs/core/http'

export default class GradesController {
  async index({ response }: HttpContext) {
    const results = await Grade.query().whereNull('deletedAt').preload('curriculum').orderBy('id')
    return response.json(results)
  }
}
