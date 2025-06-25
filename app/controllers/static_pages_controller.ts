import Module from '#models/module'
import type { HttpContext } from '@adonisjs/core/http'

export default class StaticPagesController {
  async dashboard({ inertia }: HttpContext) {
    const quickLinks = await Module.query()
      .whereNull('deletedAt')
      .orderBy('listOrder')
      .offset(1)
      .limit(6)

    return inertia.render('dashboard', { title: 'Dashboard', quickLinks })
  }

  async system({ inertia }: HttpContext) {
    return inertia.render('system/index', { title: 'System Settings' })
  }
}
