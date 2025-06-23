import StudentStatus from '#models/student_status'
import type { HttpContext } from '@adonisjs/core/http'

export default class StudentStatusesController {
  async index({ response }: HttpContext) {
    const results = await StudentStatus.query().orderBy('id')
    return response.json(results)
  }
}
