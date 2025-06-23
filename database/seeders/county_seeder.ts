import County from '#models/county'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const uniqueKey = `name`

    await County.updateOrCreateMany(uniqueKey, [
      { code: `001`, name: `Mombasa` },
      { code: `002`, name: `Kwale` },
      { code: `003`, name: `Kilifi` },
      { code: `004`, name: `Tana River` },
      { code: `005`, name: `Lamu` },
      { code: `006`, name: `Taita-Taveta` },
      { code: `007`, name: `Garissa` },
      { code: `008`, name: `Wajir` },
      { code: `009`, name: `Mandera` },
      { code: `010`, name: `Marsabit` },
      { code: `011`, name: `Isiolo` },
      { code: `012`, name: `Meru` },
      { code: `013`, name: `Tharaka-Nithi` },
      { code: `014`, name: `Embu` },
      { code: `015`, name: `Kitui` },
      { code: `016`, name: `Machakos` },
      { code: `017`, name: `Makueni` },
      { code: `018`, name: `Nyandarua` },
      { code: `019`, name: `Nyeri` },
      { code: `020`, name: `Kirinyaga` },
      { code: `021`, name: 'Murang`a' },
      { code: `022`, name: `Kiambu` },
      { code: `023`, name: `Turkana` },
      { code: `024`, name: `West Pokot` },
      { code: `025`, name: `Samburu` },
      { code: `026`, name: `Trans-Nzoia` },
      { code: `027`, name: `Uasin Gishu` },
      { code: `028`, name: `Elgeyo-Marakwet` },
      { code: `029`, name: `Nandi` },
      { code: `030`, name: `Baringo` },
      { code: `031`, name: `Laikipia` },
      { code: `032`, name: `Nakuru` },
      { code: `033`, name: `Narok` },
      { code: `034`, name: `Kajiado` },
      { code: `035`, name: `Kericho` },
      { code: `036`, name: `Bomet` },
      { code: `037`, name: `Kakamega` },
      { code: `038`, name: `Vihiga` },
      { code: `039`, name: `Bungoma` },
      { code: `040`, name: `Busia` },
      { code: `041`, name: `Siaya` },
      { code: `042`, name: `Kisumu` },
      { code: `043`, name: `Homa Bay` },
      { code: `044`, name: `Migori` },
      { code: `045`, name: `Kisii` },
      { code: `046`, name: `Nyamira` },
      { code: `047`, name: `Nairobi` },
    ])
  }
}
