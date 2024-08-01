import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  grade: { type: String, required: true }
})

export default mongoose.model('Student', studentSchema)
