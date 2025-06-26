import Module from '#models/module'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

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
        deletedAt: null,
      },
      {
        title: 'Tasks Management',
        url: '/tasks',
        icon: 'heroicons:rectangle-stack',
        iconSolid: 'heroicons:rectangle-stack-solid',
        listOrder: 2,
        deletedAt: null,
      },
      {
        title: 'Applicants Tracker',
        url: '/applicants',
        icon: 'heroicons:user-circle',
        iconSolid: 'heroicons:user-circle-solid',
        listOrder: 3,
        deletedAt: null,
      },
      {
        title: 'Students',
        url: '/students',
        icon: 'heroicons:users',
        iconSolid: 'heroicons:users-solid',
        listOrder: 4,
        deletedAt: null,
      },
      {
        title: 'Finances',
        url: '/finances',
        icon: 'heroicons:banknotes',
        iconSolid: 'heroicons:banknotes-solid',
        listOrder: 5,
        deletedAt: null,
      },
      {
        title: 'Assessments',
        url: '/assessments',
        icon: 'heroicons:clipboard-document-list',
        iconSolid: 'heroicons:clipboard-document-list-solid',
        listOrder: 6,
        deletedAt: null,
      },
      {
        title: 'School Management',
        url: '/school',
        icon: 'heroicons:academic-cap',
        iconSolid: 'heroicons:academic-cap-solid',
        listOrder: 7,
        deletedAt: null,
      },
      {
        title: 'Staff Management',
        url: '/staff',
        icon: 'heroicons:user-group',
        iconSolid: 'heroicons:user-group-solid',
        listOrder: 8,
        deletedAt: null,
      },
      {
        title: 'Communication',
        url: '/communication',
        icon: 'heroicons:chat-bubble-left-right',
        iconSolid: 'heroicons:chat-bubble-left-right-solid',
        listOrder: 9,
        deletedAt: null,
      },
      {
        title: 'Transport',
        url: '/transport',
        icon: 'heroicons:truck',
        iconSolid: 'heroicons:truck-solid',
        listOrder: 10,
        deletedAt: null,
      },
      {
        title: 'Library',
        url: '/library',
        icon: 'heroicons:building-library',
        iconSolid: 'heroicons:building-library-solid',
        listOrder: 11,
        deletedAt: null,
      },
      {
        title: 'Stores & Inventory',
        url: '/inventory',
        icon: 'heroicons:home-modern',
        iconSolid: 'heroicons:home-modern-solid',
        listOrder: 12,
        deletedAt: null,
      },
      {
        title: 'e-Learning',
        url: '/e-learning',
        icon: 'heroicons:computer-desktop',
        iconSolid: 'heroicons:computer-desktop-solid',
        listOrder: 13,
        deletedAt: DateTime.now(),
      },
      {
        title: 'Guardian Portal',
        url: '/guardian-portal',
        icon: 'heroicons:user',
        iconSolid: 'heroicons:user-solid',
        listOrder: 14,
        deletedAt: DateTime.now(),
      },
      {
        title: 'Student Portal',
        url: '/student-portal',
        icon: 'heroicons:user-circle',
        iconSolid: 'heroicons:user-circle-solid',
        listOrder: 15,
        deletedAt: DateTime.now(),
      },
      {
        title: 'Reports Center',
        url: '/reports',
        icon: 'heroicons:chart-pie',
        iconSolid: 'heroicons:chart-pie-solid',
        listOrder: 16,
        deletedAt: null,
      },
      {
        title: 'System Settings',
        url: '/system',
        icon: 'heroicons:cog-6-tooth',
        iconSolid: 'heroicons:cog-6-tooth-solid',
        listOrder: 17,
        deletedAt: null,
      },
    ])
  }
}
