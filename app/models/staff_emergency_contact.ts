import { DateTime } from 'luxon'
import { beforeFetch, belongsTo, column } from '@adonisjs/lucid/orm'
import AppBaseModel from './app_base_model.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import StaffMember from './staff_member.js'
import Relationship from './relationship.js'

export default class StaffEmergencyContact extends AppBaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare staffMemberId: number

  @column()
  declare relationshipId: number

  @column()
  declare name: string

  @column()
  declare mobile: string

  @column()
  declare email: string | null

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @beforeFetch()
  static withoutSoftDeletes(query: ModelQueryBuilderContract<typeof StaffEmergencyContact>) {
    query.whereNull('deletedAt')
  }

  @belongsTo(() => StaffMember)
  declare staffMember: BelongsTo<typeof StaffMember>

  @belongsTo(() => Relationship)
  declare relationship: BelongsTo<typeof Relationship>
}
