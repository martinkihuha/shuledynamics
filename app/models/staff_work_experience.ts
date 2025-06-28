import { DateTime } from 'luxon'
import { beforeFetch, belongsTo, column } from '@adonisjs/lucid/orm'
import AppBaseModel from './app_base_model.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import StaffMember from './staff_member.js'

export default class StaffWorkExperience extends AppBaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare staffMemberId: number

  @column()
  declare jobTitle: string

  @column()
  declare institution: string

  @column()
  declare qualification: string

  @column.dateTime()
  declare startDate: DateTime

  @column.dateTime()
  declare endDate: DateTime

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @beforeFetch()
  static withoutSoftDeletes(query: ModelQueryBuilderContract<typeof StaffWorkExperience>) {
    query.whereNull('deletedAt')
  }

  @belongsTo(() => StaffMember)
  declare staffMember: BelongsTo<typeof StaffMember>
}
