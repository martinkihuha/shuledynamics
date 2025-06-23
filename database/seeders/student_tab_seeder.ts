import StudentTab from '#models/student_tab'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const uniqueKey = 'title'

    await StudentTab.updateOrCreateMany(uniqueKey, [
      {
        title: 'Student Info',
        icon: 'heroicons:user-circle',
        iconSolid: 'heroicons:user-circle-solid',
        listOrder: 1,
      },
      {
        title: 'Guardian Info',
        icon: 'heroicons:user',
        iconSolid: 'heroicons:user-solid',
        listOrder: 2,
      },
      {
        title: 'Education History',
        icon: 'heroicons:document-chart-bar',
        iconSolid: 'heroicons:document-chart-bar-solid',
        listOrder: 3,
      },
      {
        title: 'Class Info',
        icon: 'heroicons:document-text',
        iconSolid: 'heroicons:document-text-solid',
        listOrder: 4,
      },
      {
        title: 'Medical Info',
        icon: 'heroicons:clipboard-document-list',
        iconSolid: 'heroicons:clipboard-document-list-solid',
        listOrder: 5,
      },
      {
        title: 'School Fees',
        icon: 'heroicons:banknotes',
        iconSolid: 'heroicons:banknotes-solid',
        listOrder: 6,
      },
      {
        title: 'Assessments',
        icon: 'heroicons:document-check',
        iconSolid: 'heroicons:document-check-solid',
        listOrder: 7,
      },
      {
        title: 'Incidents',
        icon: 'heroicons:clipboard-document',
        iconSolid: 'heroicons:clipboard-document-solid',
        listOrder: 8,
      },
      {
        title: 'Attendance',
        icon: 'heroicons:clipboard-document-check',
        iconSolid: 'heroicons:clipboard-document-check-solid',
        listOrder: 9,
      },
    ])
  }
}
