const { verifyToken } = require('../utils/token')

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'unauthorized' })
  }

  try {
    const decoded = verifyToken(authHeader.slice(7))
    req.userId = decoded.userId
    next()
  } catch (e) {
    return res.status(401).json({ message: 'unauthorized' })
  }
}

module.exports = { authentication }
