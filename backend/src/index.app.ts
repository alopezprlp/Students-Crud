import express from 'express'
import {
  createStudent,
  deleteStudents,
  getStudentById,
  getStudents,
  updateStudent
} from './controller/student.controller'
const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  })
})

router.post('/students', createStudent)
router.get('/students', getStudents)
router.get('/students/:id', getStudentById)
router.patch('/students/:id', updateStudent)
router.delete('/students', deleteStudents)

export default router
