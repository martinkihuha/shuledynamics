import { DateTime } from 'luxon'
import { beforeFetch, belongsTo, column } from '@adonisjs/lucid/orm'
import AppBaseModel from './app_base_model.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Curriculum from './curriculum.js'
import Grade from './grade.js'

export default class CampusCurriculumGrade extends AppBaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'campus_curriculum_id' })
  declare campusCurriculumId: number

  @column({ columnName: 'curriculum_id' })
  declare curriculumId: number

  @column({ columnName: 'grade_id' })
  declare gradeId: number

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @beforeFetch()
  static withoutSoftDeletes(query: ModelQueryBuilderContract<typeof CampusCurriculumGrade>) {
    query.whereNull('campus_curriculum_grades.deleted_at')
  }

  @belongsTo(() => Curriculum)
  declare curriculum: BelongsTo<typeof Curriculum>

  @belongsTo(() => Grade)
  declare grade: BelongsTo<typeof Grade>
}
