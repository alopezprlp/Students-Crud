import { connect, set } from 'mongoose'

//this can be an env variable
const MONGO_DB_URI = 'mongodb://localhost:27017/students'

export const connectToDB = async () => {
  try {
    set('strictQuery', false)
    const db = await connect(MONGO_DB_URI)
    console.log('MongoDB connected to', db.connection?.name)
    // Emit an event when the connection is successful
  } catch (error) {
    console.error(error)
    // Emit an event when there's an error
  }
}
