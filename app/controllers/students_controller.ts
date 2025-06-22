import Student from '#models/student'
import type { HttpContext } from '@adonisjs/core/http'

export default class StudentsController {
  async index({ inertia }: HttpContext) {
    const results = await Student.query().whereNull('deletedAt').orderBy('id')
    return inertia.render('students/index', { results, title: 'Students' })
  }
}
