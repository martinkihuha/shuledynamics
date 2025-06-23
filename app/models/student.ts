import { DateTime } from 'luxon'
import { beforeFetch, belongsTo, column } from '@adonisjs/lucid/orm'
import AppBaseModel from './app_base_model.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Country from './country.js'
import Curriculum from './curriculum.js'
import Gender from './gender.js'
import Grade from './grade.js'
import Religion from './religion.js'
import Stream from './stream.js'
import StudentStatus from './student_status.js'

export default class Student extends AppBaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare countryId: number

  @column()
  declare curriculumId: number

  @column()
  declare genderId: number

  @column()
  declare gradeId: number

  @column()
  declare religionId: number

  @column()
  declare streamId: number

  @column()
  declare studentStatusId: number

  @column()
  declare admissionNo: string

  @column()
  declare name: string

  @column()
  declare dob: string

  @column()
  declare nemisNo: string

  @column()
  declare dateOfAdmission: string

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @beforeFetch()
  static withoutSoftDeletes(query: ModelQueryBuilderContract<typeof Student>) {
    query.whereNull('deletedAt')
  }

  @belongsTo(() => Country)
  declare country: BelongsTo<typeof Country>

  @belongsTo(() => Curriculum)
  declare curriculum: BelongsTo<typeof Curriculum>

  @belongsTo(() => Gender)
  declare gender: BelongsTo<typeof Gender>

  @belongsTo(() => Grade)
  declare grade: BelongsTo<typeof Grade>

  @belongsTo(() => Religion)
  declare religion: BelongsTo<typeof Religion>

  @belongsTo(() => Stream)
  declare stream: BelongsTo<typeof Stream>

  @belongsTo(() => StudentStatus)
  declare studentStatus: BelongsTo<typeof StudentStatus>
}
