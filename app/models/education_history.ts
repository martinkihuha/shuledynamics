import { DateTime } from 'luxon'
import { beforeFetch, belongsTo, column } from '@adonisjs/lucid/orm'
import AppBaseModel from './app_base_model.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Campus from './campus.js'
import County from './county.js'
import Student from './student.js'

export default class EducationHistory extends AppBaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare campusId: number

  @column()
  declare countyId: number

  @column()
  declare studentId: number

  @column()
  declare schoolName: string

  @column()
  declare yearOfAdmission: string

  @column()
  declare yearOfDeparture: string

  @column()
  declare classOfDeparture: string

  @column()
  declare departureReason: string

  @column()
  declare leavingCertificate: string

  @column()
  declare extraActivities: boolean

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @beforeFetch()
  static withoutSoftDeletes(query: ModelQueryBuilderContract<typeof EducationHistory>) {
    query.whereNull('deletedAt')
  }

  @belongsTo(() => Campus)
  declare campus: BelongsTo<typeof Campus>

  @belongsTo(() => County)
  declare county: BelongsTo<typeof County>

  @belongsTo(() => Student)
  declare student: BelongsTo<typeof Student>
}
