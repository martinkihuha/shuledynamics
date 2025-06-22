import Module from '#models/module'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'test', 'production']

  async run() {
    const uniqueKey = 'title'

    await Module.updateOrCreateMany(uniqueKey, [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: 'heroicons:home',
        iconSolid: 'heroicons:home-solid',
        listOrder: 1,
      },
      {
        title: 'Tasks Management',
        url: '/tasks',
        icon: 'heroicons:rectangle-stack',
        iconSolid: 'heroicons:rectangle-stack-solid',
        listOrder: 2,
      },
      {
        title: 'Applicants Tracker',
        url: '/applicants',
        icon: 'heroicons:user-circle',
        iconSolid: 'heroicons:user-circle-solid',
        listOrder: 3,
      },
      {
        title: 'Students',
        url: '/students',
        icon: 'heroicons:users',
        iconSolid: 'heroicons:users-solid',
        listOrder: 4,
      },
      {
        title: 'Finances',
        url: '/finances',
        icon: 'heroicons:banknotes',
        iconSolid: 'heroicons:banknotes-solid',
        listOrder: 5,
      },
      {
        title: 'Assessments',
        url: '/assessments',
        icon: 'heroicons:clipboard-document-list',
        iconSolid: 'heroicons:clipboard-document-list-solid',
        listOrder: 6,
      },
      {
        title: 'School Management',
        url: '/school',
        icon: 'heroicons:academic-cap',
        iconSolid: 'heroicons:academic-cap-solid',
        listOrder: 7,
      },
      {
        title: 'Staff Management',
        url: '/staff',
        icon: 'heroicons:user-group',
        iconSolid: 'heroicons:user-group-solid',
        listOrder: 8,
      },
      {
        title: 'Communication',
        url: '/communication',
        icon: 'heroicons:chat-bubble-left-right',
        iconSolid: 'heroicons:chat-bubble-left-right-solid',
        listOrder: 9,
      },
      {
        title: 'Transport',
        url: '/transport',
        icon: 'heroicons:truck',
        iconSolid: 'heroicons:truck-solid',
        listOrder: 10,
      },
      {
        title: 'Library',
        url: '/library',
        icon: 'heroicons:building-library',
        iconSolid: 'heroicons:building-library-solid',
        listOrder: 11,
      },
      {
        title: 'Stores & Inventory',
        url: '/inventory',
        icon: 'heroicons:home-modern',
        iconSolid: 'heroicons:home-modern-solid',
        listOrder: 12,
      },
      {
        title: 'e-Learning',
        url: '/e-learning',
        icon: 'heroicons:computer-desktop',
        iconSolid: 'heroicons:computer-desktop-solid',
        listOrder: 13,
      },
      {
        title: 'Guardian Portal',
        url: '/guardian-portal',
        icon: 'heroicons:user',
        iconSolid: 'heroicons:user-solid',
        listOrder: 14,
      },
      {
        title: 'Student Portal',
        url: '/student-portal',
        icon: 'heroicons:user-circle',
        iconSolid: 'heroicons:user-circle-solid',
        listOrder: 15,
      },
      {
        title: 'Reports Center',
        url: '/reports',
        icon: 'heroicons:chart-pie',
        iconSolid: 'heroicons:chart-pie-solid',
        listOrder: 16,
      },
      {
        title: 'System Settings',
        url: '/system',
        icon: 'heroicons:cog',
        iconSolid: 'heroicons:cog-solid',
        listOrder: 17,
      },
    ])
  }
}
