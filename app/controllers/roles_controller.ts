import Role from '#models/role'
import type { HttpContext } from '@adonisjs/core/http'

export default class RolesController {
  async index({ inertia }: HttpContext) {
    const results = await Role.query().whereNull('deletedAt').orderBy('id')
    return inertia.render('system/roles/index', { results, title: 'Roles Management' })
  }
}
