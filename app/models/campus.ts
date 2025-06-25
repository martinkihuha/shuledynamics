import { DateTime } from 'luxon'
import { beforeFetch, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import AppBaseModel from './app_base_model.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Country from './country.js'
import County from './county.js'
import Curriculum from './curriculum.js'
import Role from './role.js'

export default class Campus extends AppBaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare countryId: number

  @column()
  declare countyId: number

  @column()
  declare name: string

  @column({ columnName: 'phone1' })
  declare phone1: string | null

  @column({ columnName: 'phone2' })
  declare phone2: string | null

  @column()
  declare email: string | null

  @column()
  declare website: string | null

  @column()
  declare physicalAddress: string | null

  @column()
  declare postalAddress: string | null

  @column()
  declare postalCode: string | null

  @column()
  declare logoUrl: string | null

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @beforeFetch()
  static withoutSoftDeletes(query: ModelQueryBuilderContract<typeof Campus>) {
    query.whereNull('campuses.deleted_at')
  }

  @belongsTo(() => Country)
  declare country: BelongsTo<typeof Country>

  @belongsTo(() => County)
  declare county: BelongsTo<typeof County>

  @manyToMany(() => Curriculum, { pivotTable: 'campus_curriculum' })
  declare curriculums: ManyToMany<typeof Curriculum>

  @manyToMany(() => Role, { pivotTable: 'campus_role' })
  declare roles: ManyToMany<typeof Role>
}
