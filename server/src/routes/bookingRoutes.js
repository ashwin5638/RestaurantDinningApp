const express = require('express')
const { bookTable } = require('../controllers/bookingController')
const { authentication } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/book', authentication, bookTable)

module.exports = router
