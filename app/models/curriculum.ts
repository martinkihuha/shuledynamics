import { DateTime } from 'luxon'
import { beforeFetch, column, hasMany, hasManyThrough, manyToMany } from '@adonisjs/lucid/orm'
import AppBaseModel from './app_base_model.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import type { HasMany, HasManyThrough, ManyToMany } from '@adonisjs/lucid/types/relations'
import AcademicYear from './academic_year.js'
import Grade from './grade.js'
import Campus from './campus.js'
import CampusCurriculumGrade from './campus_curriculum_grade.js'

export default class Curriculum extends AppBaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @beforeFetch()
  static withoutSoftDeletes(query: ModelQueryBuilderContract<typeof Curriculum>) {
    query.whereNull('curricula.deleted_at')
  }

  @hasMany(() => AcademicYear)
  declare academicYears: HasMany<typeof AcademicYear>

  @manyToMany(() => Campus, { pivotTable: 'campus_curriculum' })
  declare campuses: ManyToMany<typeof Campus>

  @hasMany(() => CampusCurriculumGrade)
  declare campusCurriculumGrades: HasMany<typeof CampusCurriculumGrade>

  @hasManyThrough([() => Grade, () => CampusCurriculumGrade], {
    localKey: 'id',
    foreignKey: 'curriculumId',
    throughLocalKey: 'gradeId',
    throughForeignKey: 'id',
  })
  declare grades: HasManyThrough<typeof Grade>
}
