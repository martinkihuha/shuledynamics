import { DateTime } from 'luxon'
import { beforeFetch, belongsTo, column } from '@adonisjs/lucid/orm'
import AppBaseModel from './app_base_model.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Curriculum from './curriculum.js'

export default class AcademicYear extends AppBaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare curriculumId: number

  @column()
  declare year: number

  @column()
  declare startDate: Date

  @column()
  declare endDate: Date

  @column()
  declare isCurrent: boolean

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @beforeFetch()
  static withoutSoftDeletes(query: ModelQueryBuilderContract<typeof AcademicYear>) {
    query.whereNull('deletedAt')
  }

  @belongsTo(() => Curriculum)
  declare curriculum: BelongsTo<typeof Curriculum>
}
