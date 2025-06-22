import { DateTime } from 'luxon'
import { beforeFetch, column } from '@adonisjs/lucid/orm'
import AppBaseModel from './app_base_model.js'
import encryption from '@adonisjs/core/services/encryption'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

export default class Tenant extends AppBaseModel {
  static connection = 'landlord_db' // static connection to the landlord DB

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare shortname: string

  @column({
    consume: (value?: Buffer) => (!value ? null : encryption.decrypt(value.toString())),
    prepare: (value?: Buffer) => (!value ? null : encryption.encrypt(value)),
  })
  declare fullname: string

  @column({
    consume: (value?: Buffer) => (!value ? null : encryption.decrypt(value.toString())),
    prepare: (value?: Buffer) => (!value ? null : encryption.encrypt(value)),
    serializeAs: null,
  })
  declare dbHost: string

  @column({
    consume: (value?: Buffer) => (!value ? null : Number(encryption.decrypt(value.toString()))),
    prepare: (value?: Buffer) => (!value ? null : encryption.encrypt(value)),
    serializeAs: null,
  })
  declare dbPort: string

  @column({
    consume: (value?: Buffer) => (!value ? null : encryption.decrypt(value.toString())),
    prepare: (value?: Buffer) => (!value ? null : encryption.encrypt(value)),
    serializeAs: null,
  })
  declare dbName: string

  @column({
    consume: (value?: Buffer) => (!value ? null : encryption.decrypt(value.toString())),
    prepare: (value?: Buffer) => (!value ? null : encryption.encrypt(value)),
    serializeAs: null,
  })
  declare dbUser: string

  @column({
    consume: (value?: Buffer) => (!value ? null : encryption.decrypt(value.toString())),
    prepare: (value?: Buffer) => (!value ? null : encryption.encrypt(value)),
    serializeAs: null,
  })
  declare dbPasw: string

  @column({
    consume: (value?: Buffer) => (!value ? null : encryption.decrypt(value.toString())),
    prepare: (value?: Buffer) => (!value ? null : encryption.encrypt(value)),
  })
  declare phone: string | null

  @column({
    consume: (value?: Buffer) => (!value ? null : encryption.decrypt(value.toString())),
    prepare: (value?: Buffer) => (!value ? null : encryption.encrypt(value)),
  })
  declare email: string | null

  @column({
    consume: (value?: Buffer) => (!value ? null : encryption.decrypt(value.toString())),
    prepare: (value?: Buffer) => (!value ? null : encryption.encrypt(value)),
  })
  declare website: string | null

  @column({
    consume: (value?: Buffer) => (!value ? null : encryption.decrypt(value.toString())),
    prepare: (value?: Buffer) => (!value ? null : encryption.encrypt(value)),
  })
  declare physicalAddress: string | null

  @column({
    consume: (value?: Buffer) => (!value ? null : encryption.decrypt(value.toString())),
    prepare: (value?: Buffer) => (!value ? null : encryption.encrypt(value)),
  })
  declare postalAddress: string | null

  @column({
    consume: (value?: Buffer) => (!value ? null : encryption.decrypt(value.toString())),
    prepare: (value?: Buffer) => (!value ? null : encryption.encrypt(value)),
  })
  declare postalCode: string | null

  @column({
    consume: (value?: Buffer) => (!value ? null : encryption.decrypt(value.toString())),
    prepare: (value?: Buffer) => (!value ? null : encryption.encrypt(value)),
  })
  declare city: string | null

  @column({
    consume: (value?: Buffer) => (!value ? null : encryption.decrypt(value.toString())),
    prepare: (value?: Buffer) => (!value ? null : encryption.encrypt(value)),
  })
  declare logoUrl: string | null

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @beforeFetch()
  static withoutSoftDeletes(query: ModelQueryBuilderContract<typeof Tenant>) {
    query.whereNull('deletedAt')
  }
}
