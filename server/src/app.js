const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const { errorHandler, notFound } = require('./middleware/errorMiddleware')

const app = express()

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

app.use(express.json({ limit: '10kb' }))
app.use(cors({ origin: CLIENT_URL }))

app.use('/api', authRoutes)
app.use('/api', bookingRoutes)

app.use(notFound)
app.use(errorHandler)

module.exports = app
