import AcademicTerm from '#models/academic_term'
import type { HttpContext } from '@adonisjs/core/http'

export default class AcademicTermsController {
  async index({ response }: HttpContext) {
    const results = await AcademicTerm.query().whereNull('deletedAt').orderBy('id')
    return response.json(results)
  }
}
