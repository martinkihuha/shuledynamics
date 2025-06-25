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
const SystemTabsController = () => import('#controllers/system_tabs_controller')
const CurriculaController = () => import('#controllers/curricula_controller')
const GradesController = () => import('#controllers/grades_controller')
const StreamsController = () => import('#controllers/streams_controller')
const RelationshipsController = () => import('#controllers/relationships_controller')
const AcademicYearsController = () => import('#controllers/academic_years_controller')
const AcademicTermsController = () => import('#controllers/academic_terms_controller')
const CampusesController = () => import('#controllers/campuses_controller')
const SalutationsController = () => import('#controllers/salutations_controller')
const RolesController = () => import('#controllers/roles_controller')

router.group(() => {
  router.on('/').redirect('/dashboard')
  router.get('/dashboard', [StaticPagesController, 'dashboard'])

  router.resource('/tasks', TasksController).only(['index'])
  router.resource('/applicants', ApplicantsController).only(['index'])
  router.resource('/students', StudentsController).only(['index', 'create'])

  router
    .group(() => {
      router.get('/', [StaticPagesController, 'system'])
      router.resource('/campus', CampusesController).only(['index', 'show'])
      router.resource('/roles', RolesController).only(['index'])
    })
    .prefix('system')

  router
    .group(() => {
      router.get('/academic-terms', [AcademicTermsController, 'index'])
      router.get('/academic-years', [AcademicYearsController, 'index'])
      router.get('/countries', [CountriesController, 'index'])
      router.get('/counties', [CountiesController, 'index'])
      router.get('/currencies', [CurrenciesController, 'index'])
      router.get('/curricula', [CurriculaController, 'index'])
      router.get('/genders', [GendersController, 'index'])
      router.get('/grades', [GradesController, 'index'])
      router.get('/relationships', [RelationshipsController, 'index'])
      router.get('/religions', [ReligionsController, 'index'])
      router.get('/taxes', [TaxesController, 'index'])
      router.get('/modules', [ModulesController, 'index'])
      router.get('/salutations', [SalutationsController, 'index'])
      router.get('/streams', [StreamsController, 'index'])
      router.get('/student-statuses', [StudentStatusesController, 'index'])
      router.get('/system-tabs', [SystemTabsController, 'index'])
    })
    .prefix('api')
})
