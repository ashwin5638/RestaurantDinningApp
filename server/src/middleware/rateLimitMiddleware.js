const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 20

const attempts = new Map()

const rateLimit = (req, res, next) => {
  const now = Date.now()
  const entry = attempts.get(req.ip)

  if (!entry || now - entry.start > WINDOW_MS) {
    attempts.set(req.ip, { start: now, count: 1 })
    return next()
  }

  entry.count += 1

  if (entry.count > MAX_ATTEMPTS) {
    return res.status(429).json({ message: 'Too many attempts, please try again later' })
  }

  next()
}

setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of attempts) {
    if (now - entry.start > WINDOW_MS) attempts.delete(key)
  }
}, WINDOW_MS).unref()

module.exports = { rateLimit }
