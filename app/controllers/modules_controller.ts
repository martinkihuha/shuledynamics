import Module from '#models/module'
import type { HttpContext } from '@adonisjs/core/http'

export default class ModulesController {
  async index({ response }: HttpContext) {
    const results = await Module.query()
      .whereNull('deletedAt')
      .orderBy('listOrder')
      .preload('subModules')
    return response.json(results)
  }
}
