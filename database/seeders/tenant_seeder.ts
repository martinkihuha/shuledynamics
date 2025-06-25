import Tenant from '#models/tenant'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const uniqueKey = 'shortname'

    await Tenant.updateOrCreateMany(uniqueKey, [
      {
        shortname: 'shule1',
        fullname: 'Shule Demo',
        dbHost: '127.0.0.1',
        dbPort: '5432',
        dbName: 'shule_0001',
        dbUser: 'martinkihuha',
        dbPasw: '',
        phone: '+254 700 000 001',
        email: 'info@shule1.com',
        website: 'www.shule1.com',
        physicalAddress: 'Kasuku Road, Kilimani',
        postalAddress: '65432',
        postalCode: '00200',
        city: 'Nairobi',
        logoUrl:
          'https://firebasestorage.googleapis.com/v0/b/garisafi.appspot.com/o/orodha%2Flogos%2Forodha_0000.png?alt=media&token=625c6896-6246-4a31-8f7f-d6066ab7aaf2',
      },
      {
        shortname: 'shule2',
        fullname: 'Some Other School',
        dbHost: '127.0.0.1',
        dbPort: '5432',
        dbName: 'shule_0002',
        dbUser: 'martinkihuha',
        dbPasw: '',
        phone: '+254 700 000 002',
        email: 'info@shule2.com',
        website: 'www.shule2.com',
        physicalAddress: 'ACK Garden Annex, First Ngong Avenue',
        postalAddress: '23456',
        postalCode: '00200',
        city: 'Nairobi',
        logoUrl:
          'https://firebasestorage.googleapis.com/v0/b/garisafi.appspot.com/o/orodha%2Flogos%2Forodha_0001.png?alt=media&token=5f26b454-eae7-42c6-8fc7-7768eab3f1ee',
      },
    ])
  }
}
