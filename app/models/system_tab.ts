import { DateTime } from 'luxon'
import { beforeFetch, column } from '@adonisjs/lucid/orm'
import AppBaseModel from './app_base_model.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

export default class SystemTab extends AppBaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare parent: string

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare url: string | null

  @column()
  declare icon: string | null

  @column()
  declare iconSolid: string | null

  @column()
  declare btnText: string | null

  @column({ serializeAs: null })
  declare listOrder: number

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null

  @beforeFetch()
  static withoutSoftDeletes(query: ModelQueryBuilderContract<typeof SystemTab>) {
    query.whereNull('deletedAt')
  }
}
