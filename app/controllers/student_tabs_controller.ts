import StudentTab from '#models/student_tab'
import type { HttpContext } from '@adonisjs/core/http'

export default class StudentTabsController {
  async index({ response }: HttpContext) {
    const results = await StudentTab.query().whereNull('deletedAt').orderBy('listOrder')
    return response.json(results)
  }
}
