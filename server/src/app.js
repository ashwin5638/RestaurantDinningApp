const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const { errorHandler, notFound } = require('./middleware/errorMiddleware')

const app = express()

const ALLOWED_ORIGINS = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map(origin => origin.trim().replace(/\/$/, ''))
  .filter(Boolean)

const toPattern = origin =>
  new RegExp(
    '^' + origin.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^/]*') + '$'
  )

const isAllowedOrigin = origin => {
  // no Origin header: same-origin navigation, curl, server-to-server calls
  if (!origin) return true

  return ALLOWED_ORIGINS.some(allowed =>
    allowed.includes('*') ? toPattern(allowed).test(origin) : allowed === origin
  )
}

app.use(express.json({ limit: '10kb' }))
app.use(cors({ origin: (origin, cb) => cb(null, isAllowedOrigin(origin)) }))

app.use('/api', authRoutes)
app.use('/api', bookingRoutes)

app.use(notFound)
app.use(errorHandler)

module.exports = app
