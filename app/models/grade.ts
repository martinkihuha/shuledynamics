import { DateTime } from 'luxon'
import { beforeFetch, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import AppBaseModel from './app_base_model.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Curriculum from './curriculum.js'
import CampusCurriculumGrade from './campus_curriculum_grade.js'

export default class Grade extends AppBaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare curriculumId: number

  @column()
  declare name: string

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @beforeFetch()
  static withoutSoftDeletes(query: ModelQueryBuilderContract<typeof Grade>) {
    query.whereNull('grades.deleted_at')
  }

  @belongsTo(() => Curriculum)
  declare curriculum: BelongsTo<typeof Curriculum>

  @hasMany(() => CampusCurriculumGrade)
  declare campusCurriculumGrades: HasMany<typeof CampusCurriculumGrade>
}
