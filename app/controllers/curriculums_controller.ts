import Curriculum from '#models/curriculum'
import type { HttpContext } from '@adonisjs/core/http'

export default class CurriculumsController {
  async index({ response }: HttpContext) {
    const results = await Curriculum.query().whereNull('deletedAt').orderBy('id')
    return response.json(results)
  }
}
