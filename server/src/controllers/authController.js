const bcrypt = require('bcrypt')
const User = require('../models/User')
const { generateToken } = require('../utils/token')

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 6

const register = async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' })
  }

  if (String(password).length < MIN_PASSWORD_LENGTH) {
    return res.status(400).json({
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
    })
  }

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({ username, email, password: hashedPassword })

    return res.status(201).json({ message: 'user registered successfully' })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' })
    }
    console.error('Register error:', error.message)
    return res.status(500).json({ error: 'internal server error' })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'invalid email or password' })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'invalid email or password' })
    }

    const token = generateToken(user._id)

    return res.status(200).json({ message: 'login successful', token })
  } catch (error) {
    console.error('Login error:', error.message)
    return res.status(500).json({ error: 'internal server error' })
  }
}

module.exports = { register, login }
