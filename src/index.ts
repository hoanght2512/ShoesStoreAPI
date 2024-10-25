import { authRoutes, productRoutes } from './routes'
import express, { Application } from 'express'
import { authMiddleware } from './middlewares'
import { errorHandler } from './utils'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(authMiddleware)

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

app.use(errorHandler)

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
