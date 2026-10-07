const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    booking_date: { type: Date, required: true },
    booking_time: { type: String, required: true },
    guests: { type: Number, required: true, min: 1 },
    requests: { type: String, trim: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Booking', bookingSchema)
