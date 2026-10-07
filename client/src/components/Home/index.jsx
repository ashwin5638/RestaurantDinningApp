import './index.css'
import Navigation from '../Navigation'
import Footer from '../Footer'
import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react"
import menuData from '../../data/menuData.json'
import gsap from 'gsap'

const TOP_DISHES = menuData.slice(0, 5)

const Home = () => {

  const titleRef = useRef(null)
  const storyLabelRef = useRef(null)
  const storyHeadingRef = useRef(null)

  const foodContainerRef = useRef(null)
  const statsRef = useRef(null)
  const hasAnimatedStats = useRef(false)

  const [yearsCount, setYearsCount] = useState(0)
  const [dishesCount, setDishesCount] = useState(0)
  const [ratingCount, setRatingCount] = useState(0)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } })

      // Hero title: 3D flip-in from above
      tl.fromTo(
        titleRef.current,
        { opacity: 0, rotateX: -90, y: -60, scale: 0.8, transformOrigin: 'top center' },
        { opacity: 1, rotateX: 0, y: 0, scale: 1, duration: 1.2, ease: 'back.out(1.7)' }
      )

      // Our Story heading block: slide in after hero title
      tl.fromTo(
        [storyLabelRef.current, storyHeadingRef.current],
        { opacity: 0, x: -70 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.10, ease: 'power3.out' },
        '-=0.2'
      )


    })

    return () => ctx.revert()
  }, [])


  useLayoutEffect(() => {
    if (foodContainerRef.current) {
      const items = foodContainerRef.current.querySelectorAll('.food-card')
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, rotateY: -90, scale: 0.6, transformOrigin: 'center center' },
          {
            opacity: 1,
            rotateY: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          }
        )
      }
    }
  }, [])



  const animateCountUp = useCallback(() => {
    if (hasAnimatedStats.current) return
    hasAnimatedStats.current = true

    const counter = { years: 0, dishes: 0, rating: 0 }
    gsap.to(counter, {
      years: 15,
      dishes: 200,
      rating: 4.9,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        setYearsCount(Math.round(counter.years))
        setDishesCount(Math.round(counter.dishes))
        setRatingCount(parseFloat(counter.rating.toFixed(1)))
      }
    })
  }, [])

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) animateCountUp() },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animateCountUp])

  return (
    <div>
      <Navigation />

      <div className='tile-container'>
        <div className="hero-inner">
          <h1
            className="title-head"
            ref={titleRef}
          >
            <span className="span">Exquisite</span>,{' '}
            taste <br /> unforgettable
            atmosphere
          </h1>


          <p className="para-title">
            Welcome to Savory, where culinary artistry meets exceptional dining experiences.
            Indulge in flavors that tell a story.
          </p>

        </div>
      </div>
        
        <section className="our-story-section">
        <p className="story-label" ref={storyLabelRef}>OUR STORY</p>
        <h2 className="story-heading" ref={storyHeadingRef}>
          Crafted with Passion,<br />
          <em>Served with Soul</em>
        </h2>
        <p className="story-text">
          Born from a lifelong obsession with ingredients and memory, SAVORY opened its doors in 2009 with a
          singular vision: to transform dining into an art form. Chef Laurent Marceau spent two decades refining his craft
          across Paris, Tokyo, and New York before returning home to create something truly his own.
        </p>
        <p className="story-text">
          Every dish on our menu is a love letter to seasonality. We partner with local farmers, foragers, and artisans to
          ensure that what arrives at your table is nothing short of extraordinary.
        </p>

        <div className="stats-row" ref={statsRef}>
          <div className="stat-item">
            <span className="stat-number">{yearsCount}</span>
            <span className="stat-suffix"> Years</span>
            <p className="stat-label">OF CULINARY EXCELLENCE</p>
          </div>
          <div className="stat-item">
            <span className="stat-number">{dishesCount}+</span>
            <span className="stat-suffix"> Dishes</span>
            <p className="stat-label">SEASONAL CREATIONS</p>
          </div>
          <div className="stat-item">
            <span className="stat-number">{ratingCount}</span>
            <span className="stat-suffix"> ★</span>
            <p className="stat-label">RATING OUT OF 5.0</p>
          </div>
        </div>
      </section>
    
      <section className="dishes-section">
        <p className="section-label">OUR MENU</p>
        <h2 className="section-heading">Popular Dishes</h2>
        <div className='food-container' ref={foodContainerRef}>
          {TOP_DISHES.map(each => (
            <div key={each.id} className='food-card'>
              <div className='food-card-img-wrapper'>
                <img
                  src={each.image}
                  className='image'
                  alt={each.name}
                  loading='lazy'
                  decoding='async'
                />
              </div>
              <p className='dish-name'>{each.name}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />

    </div>
  )
}



export default Home
