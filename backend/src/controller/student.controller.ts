import { Request, Response } from 'express'
import Student from '../models/student.model'

export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = new Student(req.body)
    await student.save()
    res.status(201).send(student)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const getStudents = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const students = await Student.find({}).skip(skip).limit(limit)
    const totalStudents = await Student.countDocuments({})

    const lastPage = Math.ceil(totalStudents / limit)
    const hasNextPage = page < lastPage
    const hasPrevPage = page > 1

    const pagination = {
      totalElements: totalStudents,
      hasNextPage,
      nextPage: hasNextPage ? page + 1 : null,
      previousPage: hasPrevPage ? page - 1 : null,
      lastPage
    }

    res.status(200).send({
      data: students,
      pagination
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id)
    if (!student) {
      return res.status(404).send('not found')
    }
    return res.send(student)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!student) {
      return res.status(404).send()
    }
    return res.send(student)
  } catch (error) {
    return res.status(400).send(error)
  }
}

export const deleteStudents = async (req: Request, res: Response) => {
  try {
    const ids = req.body

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'No IDs provided' })
    }

    // El método deleteMany devuelve un resultado con la propiedad deletedCount
    const result = await Student.deleteMany({ _id: { $in: ids } })

    if (!result) {
      return res.status(404).json({ message: 'No students found' })
    }

    return res.json({ message: 'Students deleted successfully' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'ERROR' })
  }
}
