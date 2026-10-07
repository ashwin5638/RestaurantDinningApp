const { createBooking } = require('../services/bookingService')

const TIME_PATTERN = /^\d{2}:\d{2}$/

const bookTable = async (req, res) => {
  const { booking_date, booking_time, guests, requests } = req.body

  if (!booking_date || !booking_time || !guests) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const guestCount = Number(guests)

  if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 20) {
    return res.status(400).json({ message: 'Guests must be between 1 and 20' })
  }

  if (Number.isNaN(Date.parse(booking_date)) || !TIME_PATTERN.test(booking_time)) {
    return res.status(400).json({ message: 'Invalid booking date or time' })
  }

  try {
    const result = await createBooking(
      req.userId,
      booking_date,
      booking_time,
      guestCount,
      requests
    )

    return res.status(201).json({
      message: 'Booking successful',
      bookingId: result.bookingId
    })
  } catch (error) {
    console.error('Booking error:', error.message)
    return res.status(500).json({ error: 'Database error' })
  }
}

module.exports = { bookTable }
