import Task from '#models/task'
import type { HttpContext } from '@adonisjs/core/http'

export default class TasksController {
  async index({ inertia }: HttpContext) {
    const results = await Task.query().whereNull('deletedAt').orderBy('id')

    return inertia.render('tasks/index', { results, title: 'Tasks' })
  }
}
