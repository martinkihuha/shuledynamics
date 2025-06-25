import Campus from '#models/campus'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const uniqueKey = 'name'

    await Campus.updateOrCreateMany(uniqueKey, [
      {
        countryId: 114, // Default to Kenya
        countyId: 47, // Default to Nairobi County
        name: 'Upperhill Campus',
        phone1: '+254 700 000 001',
        email: 'info@shule1.com',
        website: 'www.shule1.com',
        physicalAddress: 'ACK Garden Annex, 1st Ngong Avenue',
        postalAddress: '51236',
        postalCode: '00200',
        logoUrl:
          'https://firebasestorage.googleapis.com/v0/b/garisafi.appspot.com/o/orodha%2Flogos%2Forodha_0000.png?alt=media&token=625c6896-6246-4a31-8f7f-d6066ab7aaf2',
      },
      {
        countryId: 114, // Default to Kenya
        countyId: 47, // Default to Nairobi County
        name: 'Kilimani Campus',
        phone1: '+254 700 000 002',
        email: 'info@shule2.com',
        website: 'www.shule2.com',
        physicalAddress: 'Theta Lane off Lenana Road, Kilimani',
        logoUrl:
          'https://firebasestorage.googleapis.com/v0/b/garisafi.appspot.com/o/orodha%2Flogos%2Forodha_0001.png?alt=media&token=5f26b454-eae7-42c6-8fc7-7768eab3f1ee',
      },
    ])
  }
}
