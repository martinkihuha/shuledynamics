import { DateTime } from 'luxon'
import { beforeFetch, belongsTo, column } from '@adonisjs/lucid/orm'
import AppBaseModel from './app_base_model.js'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Campus from './campus.js'
import Country from './country.js'
import Curriculum from './curriculum.js'
import Gender from './gender.js'
import Religion from './religion.js'
import Salutation from './salutation.js'

export default class StaffMember extends AppBaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare campusId: number

  @column()
  declare countryId: number

  @column()
  declare genderId: number

  @column()
  declare religionId: number

  @column()
  declare salutationId: number

  @column()
  declare nationalId: string

  @column()
  declare name: string

  @column()
  declare mobile: string | null

  @column()
  declare email: string | null

  @column()
  declare location: string

  @column()
  declare postalAddress: string | null

  @column()
  declare postalCode: string | null

  @column()
  declare pinNumber: string | null

  @column()
  declare nssfNumber: string | null

  @column()
  declare shifNumber: string | null

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @beforeFetch()
  static withoutSoftDeletes(query: ModelQueryBuilderContract<typeof StaffMember>) {
    query.whereNull('deletedAt')
  }

  @belongsTo(() => Campus)
  declare campus: BelongsTo<typeof Campus>

  @belongsTo(() => Country)
  declare country: BelongsTo<typeof Country>

  @belongsTo(() => Curriculum)
  declare curriculum: BelongsTo<typeof Curriculum>

  @belongsTo(() => Gender)
  declare gender: BelongsTo<typeof Gender>

  @belongsTo(() => Religion)
  declare religion: BelongsTo<typeof Religion>

  @belongsTo(() => Salutation)
  declare salutation: BelongsTo<typeof Salutation>
}
