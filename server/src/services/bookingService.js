const Booking = require('../models/Booking')

const createBooking = async (userId, bookingDate, bookingTime, guests, requests) => {
  const booking = await Booking.create({
    user: userId,
    booking_date: bookingDate,
    booking_time: bookingTime,
    guests,
    requests
  })

  return { bookingId: booking._id }
}

module.exports = { createBooking }
