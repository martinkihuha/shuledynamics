import CampusRole from '#models/campus_role'
import type { HttpContext } from '@adonisjs/core/http'

export default class CampusRolesController {
  async index({ response }: HttpContext) {
    const results = await CampusRole.query().preload('campus').preload('role')
    return response.json(results)
  }
}
