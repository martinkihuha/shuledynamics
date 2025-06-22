/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const StaticPagesController = () => import('#controllers/static_pages_controller')
const CurrenciesController = () => import('#controllers/currencies_controller')
const GendersController = () => import('#controllers/genders_controller')
const TaxesController = () => import('#controllers/taxes_controller')
const ModulesController = () => import('#controllers/modules_controller')
const TasksController = () => import('#controllers/tasks_controller')
const ApplicantsController = () => import('#controllers/applicants_controller')
const StudentsController = () => import('#controllers/students_controller')

router.group(() => {
  router.on('/').redirect('/dashboard')
  router.get('/dashboard', [StaticPagesController, 'dashboard'])

  router.resource('/tasks', TasksController).only(['index'])
  router.resource('/applicants', ApplicantsController).only(['index'])
  router.resource('/students', StudentsController).only(['index'])

  router
    .group(() => {
      router.get('/currencies', [CurrenciesController, 'index'])
      router.get('/genders', [GendersController, 'index'])
      router.get('/taxes', [TaxesController, 'index'])
      router.get('/modules', [ModulesController, 'index'])
    })
    .prefix('api')
})
