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
const CountriesController = () => import('#controllers/countries_controller')
const CountiesController = () => import('#controllers/counties_controller')
const CurrenciesController = () => import('#controllers/currencies_controller')
const GendersController = () => import('#controllers/genders_controller')
const ReligionsController = () => import('#controllers/religions_controller')
const TaxesController = () => import('#controllers/taxes_controller')
const ModulesController = () => import('#controllers/modules_controller')
const TasksController = () => import('#controllers/tasks_controller')
const ApplicantsController = () => import('#controllers/applicants_controller')
const StudentsController = () => import('#controllers/students_controller')
const StudentStatusesController = () => import('#controllers/student_statuses_controller')
const StudentTabsController = () => import('#controllers/student_tabs_controller')
const CurriculumsController = () => import('#controllers/curriculums_controller')
const GradesController = () => import('#controllers/grades_controller')
const StreamsController = () => import('#controllers/streams_controller')
const RelationshipsController = () => import('#controllers/relationships_controller')

router.group(() => {
  router.on('/').redirect('/dashboard')
  router.get('/dashboard', [StaticPagesController, 'dashboard'])

  router.resource('/tasks', TasksController).only(['index'])
  router.resource('/applicants', ApplicantsController).only(['index'])
  router.resource('/students', StudentsController).only(['index', 'create'])

  router
    .group(() => {
      router.get('/countries', [CountriesController, 'index'])
      router.get('/counties', [CountiesController, 'index'])
      router.get('/currencies', [CurrenciesController, 'index'])
      router.get('/curriculums', [CurriculumsController, 'index'])
      router.get('/genders', [GendersController, 'index'])
      router.get('/grades', [GradesController, 'index'])
      router.get('/relationships', [RelationshipsController, 'index'])
      router.get('/religions', [ReligionsController, 'index'])
      router.get('/taxes', [TaxesController, 'index'])
      router.get('/modules', [ModulesController, 'index'])
      router.get('/streams', [StreamsController, 'index'])
      router.get('/student-statuses', [StudentStatusesController, 'index'])
      router.get('/student-tabs', [StudentTabsController, 'index'])
    })
    .prefix('api')
})
