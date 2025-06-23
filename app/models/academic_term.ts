import { DateTime } from 'luxon'
import { beforeFetch, belongsTo, column } from '@adonisjs/lucid/orm'
import AppBaseModel from './app_base_model.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import AcademicYear from './academic_year.js'

export default class AcademicTerm extends AppBaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare academicYearId: number

  @column()
  declare name: string

  @column()
  declare startDate: Date

  @column()
  declare endDate: Date

  @column()
  declare midtermStartDate: Date | null

  @column()
  declare midtermEndDate: Date | null

  @column()
  declare isCurrent: boolean

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @beforeFetch()
  static withoutSoftDeletes(query: ModelQueryBuilderContract<typeof AcademicTerm>) {
    query.whereNull('deletedAt')
  }

  @belongsTo(() => AcademicYear)
  declare academicYear: BelongsTo<typeof AcademicYear>
}
