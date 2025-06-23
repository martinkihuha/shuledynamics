import Relationship from '#models/relationship'
import type { HttpContext } from '@adonisjs/core/http'

export default class RelationshipsController {
  async index({ response }: HttpContext) {
    const results = await Relationship.query().whereNull('deletedAt').orderBy('id')
    return response.json(results)
  }
}
