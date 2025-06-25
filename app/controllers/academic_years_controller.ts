import AcademicYear from '#models/academic_year'
import type { HttpContext } from '@adonisjs/core/http'

export default class AcademicYearsController {
  async index({ response }: HttpContext) {
    const results = await AcademicYear.query().whereNull('deletedAt').orderBy('id')
    return response.json(results)
  }
}
