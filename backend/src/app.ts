import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import { notFound, errorHandler } from './middleware/index.middleware'
import api from './index.app'

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use('/api/', api)

app.use(notFound)
app.use(errorHandler)

export default app
