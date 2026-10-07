import { useState } from 'react'
import {
  FiClock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend
} from 'react-icons/fi'
import Navigation from '../Navigation'
import Footer from '../Footer'
import './index.css'

const contactDetails = [
  {
    icon: FiMapPin,
    label: 'Address',
    lines: ['142 Marceau Lane', 'Riverside District, 56000']
  },
  {
    icon: FiPhone,
    label: 'Phone',
    lines: ['+1 (555) 018-4420'],
    href: 'tel:+15550184420'
  },
  {
    icon: FiMail,
    label: 'Email',
    lines: ['hello@savory.example'],
    href: 'mailto:hello@savory.example'
  },
  {
    icon: FiClock,
    label: 'Hours',
    lines: ['Mon–Fri · 12:00 – 22:30', 'Sat–Sun · 11:00 – 23:00']
  }
]

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleChange = event => {
    const { id, value } = event.target
    setForm(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    setError('')

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in your name, email and message.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <>
      <Navigation />

      <main className='contact-page'>
        <header className='contact-hero'>
          <div className='contact-hero-inner'>
            <p className='contact-eyebrow'>We would love to hear from you</p>
            <h1 className='contact-head'>Get in Touch</h1>
            <p className='contact-sub'>
              Reservations, private events or a question about the menu — drop
              us a line and we will reply within one working day.
            </p>
          </div>
        </header>

        <section className='contact-body'>
          <div className='contact-details'>
            {contactDetails.map(({ icon: Icon, label, lines, href }) => (
              <div className='contact-card' key={label}>
                <span className='contact-icon'>
                  <Icon aria-hidden='true' />
                </span>
                <div>
                  <h2 className='contact-label'>{label}</h2>
                  {lines.map(line =>
                    href ? (
                      <a className='contact-value link' href={href} key={line}>
                        {line}
                      </a>
                    ) : (
                      <p className='contact-value' key={line}>
                        {line}
                      </p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className='contact-form-wrap'>
            <h2 className='contact-form-title'>Send a message</h2>

            {sent ? (
              <div className='contact-success' role='status'>
                <p className='success-title'>Thank you — message received.</p>
                <p className='success-text'>
                  We will get back to you at the email you provided shortly.
                </p>
                <button
                  type='button'
                  className='contact-btn'
                  onClick={() => setSent(false)}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form className='contact-form' onSubmit={handleSubmit} noValidate>
                <div className='field'>
                  <label htmlFor='name'>Name</label>
                  <input
                    id='name'
                    type='text'
                    value={form.name}
                    onChange={handleChange}
                    placeholder='Your name'
                    autoComplete='name'
                  />
                </div>

                <div className='field'>
                  <label htmlFor='email'>Email</label>
                  <input
                    id='email'
                    type='email'
                    value={form.email}
                    onChange={handleChange}
                    placeholder='you@example.com'
                    autoComplete='email'
                  />
                </div>

                <div className='field'>
                  <label htmlFor='message'>Message</label>
                  <textarea
                    id='message'
                    rows='5'
                    value={form.message}
                    onChange={handleChange}
                    placeholder='How can we help?'
                  />
                </div>

                {error && (
                  <p className='contact-error' role='alert'>
                    {error}
                  </p>
                )}

                <button type='submit' className='contact-btn'>
                  <FiSend aria-hidden='true' />
                  Send message
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Contact
