import SystemTab from '#models/system_tab'
import type { HttpContext } from '@adonisjs/core/http'

export default class SystemTabsController {
  async index({ request, response }: HttpContext) {
    const search = request.input('search', null)
    const results = await SystemTab.query()
      .whereNull('deletedAt')
      .if(search, (query) =>
        query.andWhere((subQuery) => {
          subQuery.whereILike('parent', `%${search}%`)
        })
      )
      .orderBy('listOrder')
    return response.json(results)
  }
}
