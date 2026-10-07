import { useState } from 'react'
import Navigation from '../Navigation'
import { API_BASE } from '../../services/api'
import './index.css'

const BookTable = () => {
    const [formData, setFormData] = useState({
        booking_date: '',
        booking_time: '',
        guests: 2,
        requests: ''
    })
    const [error, setError] = useState('')
    const [showPopup, setShowPopup] = useState(false)

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const token = localStorage.getItem('token')
        if (!token) {
            setError('Please login to book a table')
            return
        }

        try {
            const res = await fetch(`${API_BASE}/api/book`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    booking_date: formData.booking_date,
                    booking_time: formData.booking_time,
                    guests: Number(formData.guests),
                    requests: formData.requests
                })
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || 'Booking failed')
                return
            }

            setShowPopup(true)
            setFormData({
                booking_date: '',
                booking_time: '',
                guests: 2,
                requests: ''
            })
        } catch (e) {
            setError('Something went wrong. Please try again later.')
        }
    }

    return (
        <>
            <Navigation />
            <div className="book-table-container">
                <div className="booking-form-container">
                    <h1 className="booking-title">Book a Table</h1>
                    <p className="booking-subtitle">Reserve your spot for an unforgettable dining experience.</p>

                    <form className="booking-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="booking_date">Date</label>
                            <input
                                type="date"
                                id="booking_date"
                                value={formData.booking_date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="booking_time">Time</label>
                            <input
                                type="time"
                                id="booking_time"
                                value={formData.booking_time}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="guests">Number of Guests</label>
                            <input
                                type="number"
                                id="guests"
                                min="1"
                                max="20"
                                value={formData.guests}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="requests">Special Requests</label>
                            <textarea
                                id="requests"
                                rows="3"
                                value={formData.requests}
                                onChange={handleChange}
                                placeholder="seating preference, etc."
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-btn">Confirm Reservation</button>
                    </form>

                    {error && <p className="error-message" style={{ color: '#ff4d4d', marginTop: '20px', textAlign: 'center' }}>{error}</p>}
                </div>
            </div>

            {showPopup && (
                <div className="modal-overlay">
                    <div className="success-modal">
                        <div className="success-icon">✓</div>
                        <h2>Booking Successful!</h2>
                        <p>Your table has been reserved. You will receive a confirmation email shortly with all the details.</p>
                        <button className="close-modal-btn" onClick={() => setShowPopup(false)}>Great!</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default BookTable
