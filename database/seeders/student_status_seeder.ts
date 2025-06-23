import StudentStatus from '#models/student_status'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const uniqueKey = 'name'

    await StudentStatus.updateOrCreateMany(uniqueKey, [
      { name: 'Active Students' },
      { name: 'Under Admission' },
      { name: 'Disciplinary' },
      { name: 'Absent' },
      { name: 'In Fees Arrears' },
    ])
  }
}
