import Applicant from '#models/applicant'
import type { HttpContext } from '@adonisjs/core/http'

export default class ApplicantsController {
  async index({ inertia }: HttpContext) {
    const results = await Applicant.query().whereNull('deletedAt').orderBy('id')
    return inertia.render('applicants/index', { results, title: 'Applicants' })
  }
}
