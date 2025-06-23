import Country from '#models/country'
import Guardian from '#models/guardian'
import Relationship from '#models/relationship'
import Religion from '#models/religion'
import Salutation from '#models/salutation'
import type { HttpContext } from '@adonisjs/core/http'

export default class GuardiansController {
  async index({ response }: HttpContext) {
    const results = await Guardian.query().whereNull('deletedAt').orderBy('id')
    return response.json(results)
  }

  async create({ inertia, params }: HttpContext) {
    const result = {
      id: '',
      countryId: '114', // Default to Kenya
      country: <Country>{},
      relationshipId: '',
      relationship: <Relationship>{},
      religionId: '',
      religion: <Religion>{},
      salutationId: '',
      salutation: <Salutation>{},
      name: '',
      mobile: '',
      email: '',
      location: '',
      notes: '',
      createdAt: '',
      updatedAt: '',
    }

    return inertia.render(`students/create/${params.id}`, { result, title: 'Guardian Info' })
  }
}
