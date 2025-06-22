import { DateTime } from 'luxon'
import { beforeFetch, belongsTo, column } from '@adonisjs/lucid/orm'
import AppBaseModel from './app_base_model.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Module from './module.js'

export default class SubModule extends AppBaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare moduleId: number

  @column()
  declare title: string

  @column()
  declare url: string

  @column()
  declare icon: string

  @column()
  declare iconSolid: string

  @column()
  declare listOrder: number

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null

  @beforeFetch()
  static withoutSoftDeletes(query: ModelQueryBuilderContract<typeof SubModule>) {
    query.whereNull('deletedAt')
  }

  @belongsTo(() => Module)
  declare navItem: BelongsTo<typeof Module>
}
