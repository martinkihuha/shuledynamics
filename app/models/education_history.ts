import { DateTime } from 'luxon'
import { beforeFetch, belongsTo, column } from '@adonisjs/lucid/orm'
import AppBaseModel from './app_base_model.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Campus from './campus.js'
import County from './county.js'
import Curriculum from './curriculum.js'
import DepartureReason from './departure_reason.js'
import Grade from './grade.js'
import Student from './student.js'

export default class EducationHistory extends AppBaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare campusId: number

  @column()
  declare countyId: number

  @column()
  declare curriculumId: number

  @column()
  declare departureReasonId: number

  @column()
  declare gradeId: number

  @column()
  declare studentId: number

  @column()
  declare schoolName: string

  @column.dateTime()
  declare dateOfAdmission: DateTime

  @column.dateTime()
  declare dateOfDeparture: DateTime

  @column()
  declare classOfDeparture: string

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

  @belongsTo(() => Curriculum)
  declare curriculum: BelongsTo<typeof Curriculum>

  @belongsTo(() => DepartureReason)
  declare departureReason: BelongsTo<typeof DepartureReason>

  @belongsTo(() => Grade)
  declare grade: BelongsTo<typeof Grade>

  @belongsTo(() => Student)
  declare student: BelongsTo<typeof Student>
}
