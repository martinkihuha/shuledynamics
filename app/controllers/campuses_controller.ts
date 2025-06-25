import Campus from '#models/campus'
import type { HttpContext } from '@adonisjs/core/http'

export default class CampusesController {
  async index({ inertia, request }: HttpContext) {
    const search = request.input('search', null)
    const page = search ? 1 : request.input('page', 1)
    const limit = request.input('limit', 20)

    const results = await Campus.query()
      .whereNull('deletedAt')
      .if(search, (query) =>
        query.andWhere((subQuery) => {
          subQuery.whereILike('name', `%${search}%`)
        })
      )
      .preload('country')
      .preload('county')
      .orderBy('id')
      .paginate(page, limit)

    return inertia.render('system/campus/index', { results, title: 'Campus Management' })
  }

  async show({ inertia, params }: HttpContext) {
    const result = await Campus.query()
      .where('id', params.id)
      .preload('country')
      .preload('county')
      .preload('curriculums', (c) => c.preload('grades'))
      .firstOrFail()

    return inertia.render('system/campus/show', { result, title: result?.name })
  }
}
