import Country from '#models/country'
import Curriculum from '#models/curriculum'
import Gender from '#models/gender'
import Grade from '#models/grade'
import Religion from '#models/religion'
import Stream from '#models/stream'
import Student from '#models/student'
import StudentStatus from '#models/student_status'
import type { HttpContext } from '@adonisjs/core/http'

export default class StudentsController {
  async index({ inertia, request }: HttpContext) {
    const search = request.input('search', null)
    const page = search ? 1 : request.input('page', 1)
    const limit = request.input('limit', 20)

    const results = await Student.query().whereNull('deletedAt').orderBy('id').paginate(page, limit)
    return inertia.render('students/index', { results, title: 'Students' })
  }

  async create({ inertia }: HttpContext) {
    const result = {
      id: '',
      countryId: '114', // Default to Kenya
      country: <Country>{},
      curriculumId: '',
      curriculum: <Curriculum>{},
      genderId: '',
      gender: <Gender>{},
      gradeId: '',
      grade: <Grade>{},
      religionId: '',
      religion: <Religion>{},
      streamId: '',
      stream: <Stream>{},
      studentStatusId: '2', // Default to 'Under Admission'
      studentStatus: <StudentStatus>{},
      admissionNo: '',
      name: '',
      dob: '',
      nemisNo: '',
      dateOfAdmission: '',
      createdAt: '',
      updatedAt: '',
    }

    return inertia.render('students/create', { result, title: 'Student Admission' })
  }
}
