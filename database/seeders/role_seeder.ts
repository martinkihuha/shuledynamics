import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const uniqueKey = 'name'

    await Role.updateOrCreateMany(uniqueKey, [
      { name: 'School Admin' },
      { name: 'Principal' },
      { name: 'Deputy Principal' },
      { name: 'Bursar' },
      { name: 'Class Teacher' },
      { name: 'Teacher' },
      { name: 'Boarding Master' },
    ])
  }
}
