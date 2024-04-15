import config from './utils/config'
import express from 'express'
const app = express()
import cors from 'cors'
import usersRouter from './controllers/users'
import accountsRouter from './controllers/accounts'
import middleware from './utils/middleware'
import logger from './utils/logger'
import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

if (config.MONGODB_URI) {
  logger.info('connecting to', config.MONGODB_URI)

  mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
      logger.info('connected to MongoDB')
    })
    .catch((error) => {
      logger.error('error connecting to MongoDB:', error.message)
    })
}

app.use(cors())
// app.use(express.static('dist'));
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/users', usersRouter)
app.use('/api/accounts', accountsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// module.exports = app
export default app
