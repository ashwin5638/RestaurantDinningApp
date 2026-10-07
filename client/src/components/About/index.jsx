import { Link } from 'react-router-dom'
import { FiAward, FiFeather, FiHeart } from 'react-icons/fi'
import Navigation from '../Navigation'
import Footer from '../Footer'
import heroImage from '../../assets/hero-bg.jpg'
import './index.css'

const values = [
  {
    icon: FiFeather,
    title: 'Seasonal Sourcing',
    text: 'We buy from the same growers, fishers and foragers we have worked with for years — the menu changes when the season does.'
  },
  {
    icon: FiAward,
    title: 'Chef-Led Kitchen',
    text: 'Every plate leaves a kitchen run by Chef Laurent Marceau, who has spent two decades in Paris, Tokyo and New York.'
  },
  {
    icon: FiHeart,
    title: 'Warm Hospitality',
    text: 'Fine food without the formality. We want the room to feel like dinner at the home of someone who really can cook.'
  }
]

const About = () => {
  return (
    <>
      <Navigation />

      <main className='about-page'>
        <header className='about-hero'>
          <div className='about-hero-inner'>
            <p className='about-eyebrow'>Since 2009</p>
            <h1 className='about-head'>Our Story</h1>
            <p className='about-sub'>
              A neighbourhood dining room built on one idea: cook with the
              seasons, and treat every guest like a regular.
            </p>
          </div>
        </header>

        <section className='about-story'>
          <div className='about-story-media'>
            <img src={heroImage} alt='The Savory dining room' loading='lazy' />
          </div>

          <div className='about-story-body'>
            <p className='about-label'>How it started</p>
            <h2 className='about-heading'>
              Crafted with Passion,
              <br />
              <em>Served with Soul</em>
            </h2>
            <p className='about-text'>
              Born from a lifelong obsession with ingredients and memory,
              SAVORY opened its doors in 2009 with a singular vision: to
              transform dining into an art form. Chef Laurent Marceau spent two
              decades refining his craft across Paris, Tokyo and New York before
              returning home to create something truly his own.
            </p>
            <p className='about-text'>
              Every dish on our menu is a love letter to seasonality. We partner
              with local farmers, foragers and artisans to ensure that what
              arrives at your table is nothing short of extraordinary.
            </p>

            <Link to='/menucard' className='about-link'>
              Explore the menu
            </Link>
          </div>
        </section>

        <section className='about-values'>
          {values.map(({ icon: Icon, title, text }) => (
            <article className='value-card' key={title}>
              <span className='value-icon'>
                <Icon aria-hidden='true' />
              </span>
              <h3 className='value-title'>{title}</h3>
              <p className='value-text'>{text}</p>
            </article>
          ))}
        </section>

        <section className='about-stats'>
          <div className='about-stat'>
            <span className='about-stat-number'>16</span>
            <span className='about-stat-suffix'>+</span>
            <p className='about-stat-label'>Years of service</p>
          </div>
          <div className='about-stat'>
            <span className='about-stat-number'>40</span>
            <span className='about-stat-suffix'>+</span>
            <p className='about-stat-label'>Dishes each season</p>
          </div>
          <div className='about-stat'>
            <span className='about-stat-number'>4.8</span>
            <span className='about-stat-suffix'>★</span>
            <p className='about-stat-label'>Average guest rating</p>
          </div>
        </section>

        <section className='about-cta'>
          <h2 className='about-cta-title'>Come sit at our table</h2>
          <p className='about-cta-text'>
            Lunch and dinner service, seven days a week. Reservations
            recommended on weekends.
          </p>
          <Link to='/book' className='about-cta-btn'>
            Book a Table
          </Link>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default About
