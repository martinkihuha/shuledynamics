import Curriculum from '#models/curriculum'
import type { HttpContext } from '@adonisjs/core/http'

export default class CurriculaController {
  async index({ response }: HttpContext) {
    const results = await Curriculum.query().whereNull('deletedAt').preload('grades').orderBy('id')
    return response.json(results)
  }
}
