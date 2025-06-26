import { DateTime } from 'luxon'
import { beforeFetch, belongsTo, column } from '@adonisjs/lucid/orm'
import AppBaseModel from './app_base_model.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Campus from './campus.js'
import Curriculum from './curriculum.js'

export default class CampusCurriculum extends AppBaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'campus_id' })
  declare campusId: number

  @column({ columnName: 'curriculum_id' })
  declare curriculumId: number

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @beforeFetch()
  static withoutSoftDeletes(query: ModelQueryBuilderContract<typeof CampusCurriculum>) {
    query.whereNull('campus_curriculum.deleted_at')
  }

  @belongsTo(() => Campus)
  declare campus: BelongsTo<typeof Campus>

  @belongsTo(() => Curriculum)
  declare curriculum: BelongsTo<typeof Curriculum>
}
