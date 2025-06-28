import { DateTime } from 'luxon'
import { beforeFetch, belongsTo, column } from '@adonisjs/lucid/orm'
import AppBaseModel from './app_base_model.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Campus from './campus.js'
import Role from './role.js'

export default class CampusRole extends AppBaseModel {
  static table = 'campus_role'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare campusId: number

  @column()
  declare roleId: number

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @beforeFetch()
  static withoutSoftDeletes(query: ModelQueryBuilderContract<typeof CampusRole>) {
    query.whereNull('campus_role.deleted_at')
  }

  @belongsTo(() => Campus)
  declare campus: BelongsTo<typeof Campus>

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>
}
