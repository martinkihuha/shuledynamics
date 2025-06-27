import SystemTab from '#models/system_tab'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const uniqueKey = 'title'

    await SystemTab.updateOrCreateMany(uniqueKey, [
      {
        parent: 'Student',
        title: 'Student Info',
        icon: 'heroicons:user-circle',
        iconSolid: 'heroicons:user-circle-solid',
        listOrder: 1,
      },
      {
        parent: 'Student',
        title: 'Guardian Info',
        icon: 'heroicons:user',
        iconSolid: 'heroicons:user-solid',
        listOrder: 2,
      },
      {
        parent: 'Student',
        title: 'Education History',
        icon: 'heroicons:document-chart-bar',
        iconSolid: 'heroicons:document-chart-bar-solid',
        listOrder: 3,
      },
      {
        parent: 'Student',
        title: 'Class Info',
        icon: 'heroicons:document-text',
        iconSolid: 'heroicons:document-text-solid',
        listOrder: 4,
      },
      {
        parent: 'Student',
        title: 'Medical Info',
        icon: 'heroicons:clipboard-document-list',
        iconSolid: 'heroicons:clipboard-document-list-solid',
        listOrder: 5,
      },
      {
        parent: 'Student',
        title: 'School Fees',
        icon: 'heroicons:banknotes',
        iconSolid: 'heroicons:banknotes-solid',
        listOrder: 6,
      },
      {
        parent: 'Student',
        title: 'Assessments',
        icon: 'heroicons:document-check',
        iconSolid: 'heroicons:document-check-solid',
        listOrder: 7,
      },
      {
        parent: 'Student',
        title: 'Incidents',
        icon: 'heroicons:clipboard-document',
        iconSolid: 'heroicons:clipboard-document-solid',
        listOrder: 8,
      },
      {
        parent: 'Student',
        title: 'Attendance',
        icon: 'heroicons:clipboard-document-check',
        iconSolid: 'heroicons:clipboard-document-check-solid',
        listOrder: 9,
      },
      {
        parent: 'System',
        title: 'Campus Management',
        description: 'Manage campus information, curriculums, academic years, and classes.',
        url: '/system/campus',
        icon: 'heroicons:building-office-2',
        iconSolid: 'heroicons:building-office-2-solid',
        btnText: 'Manage Campus',
        listOrder: 10,
      },
      {
        parent: 'System',
        title: 'Roles Management',
        description: 'Manage (adding, editing, and deleting) user roles and permissions.',
        url: '/system/roles',
        icon: 'heroicons:user-circle',
        iconSolid: 'heroicons:user-circle-solid',
        btnText: 'Manage Roles',
        listOrder: 11,
      },
      {
        parent: 'Staff',
        title: 'Staff Info',
        icon: 'heroicons:user',
        iconSolid: 'heroicons:user-solid',
        listOrder: 12,
      },
      {
        parent: 'Staff',
        title: 'Education',
        icon: 'heroicons:document-text',
        iconSolid: 'heroicons:document-text-solid',
        listOrder: 13,
      },
      {
        parent: 'Staff',
        title: 'Work Experience',
        icon: 'heroicons:calendar-date-range',
        iconSolid: 'heroicons:calendar-date-range-solid',
        listOrder: 14,
      },
      {
        parent: 'Staff',
        title: 'Responsibilities',
        icon: 'heroicons:clipboard-document-check',
        iconSolid: 'heroicons:clipboard-document-check-solid',
        listOrder: 15,
      },
    ])
  }
}
