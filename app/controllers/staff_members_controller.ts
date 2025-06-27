import Campus from '#models/campus'
import Country from '#models/country'
import Gender from '#models/gender'
import Religion from '#models/religion'
import Salutation from '#models/salutation'
import StaffMember from '#models/staff_member'
import type { HttpContext } from '@adonisjs/core/http'

export default class StaffMembersController {
  async index({ inertia, request }: HttpContext) {
    const search = request.input('search', null)
    const page = search ? 1 : request.input('page', 1)
    const limit = request.input('limit', 20)

    const results = await StaffMember.query()
      .whereNull('deletedAt')
      .if(search, (query) =>
        query.andWhere((subQuery) => {
          subQuery
            .whereILike('name', `%${search}%`)
            .orWhereILike('nationalId', `%${search}%`)
            .orWhereILike('mobile', `%${search}%`)
            .orWhereILike('email', `%${search}%`)
        })
      )
      .preload('campus')
      .preload('country')
      .preload('gender')
      .preload('religion')
      .orderBy('id')
      .paginate(page, limit)

    return inertia.render('staff/index', { results, title: 'Staff' })
  }

  async create({ inertia }: HttpContext) {
    const result = {
      id: '',
      campusId: '', // Will be set based on the user's campus
      campus: <Campus>{},
      countryId: '',
      country: <Country>{},
      genderId: '',
      gender: <Gender>{},
      religionId: '',
      religion: <Religion>{},
      salutationId: '',
      salutation: <Salutation>{},
      nationalId: '',
      name: '',
      mobile: '',
      email: '',
      location: '',
      postalAddress: '',
      postalCode: '',
      pinNumber: '',
      nssfNumber: '',
      nhifNumber: '',
      createdAt: '',
      updatedAt: '',
    }

    return inertia.render('staff/create', {
      result,
      title: 'New Staff Member',
    })
  }
}
