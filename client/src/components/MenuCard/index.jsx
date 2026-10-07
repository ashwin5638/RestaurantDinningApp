import { useMemo, useState } from 'react'
import { FiClock, FiSearch, FiStar, FiUsers, FiX } from 'react-icons/fi'
import Navigation from '../Navigation'
import Footer from '../Footer'
import menuData from '../../data/menuData.json'
import './index.css'

// Dishes shown on the default "All" view — a tight, curated shortlist.
const FEATURED_IDS = [1, 4, 7, 11, 12, 16, 18, 20, 22, 23]

const CATEGORY_ORDER = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Appetizer',
  'Snack',
  'Dessert',
  'Beverage'
]

const MenuCard = () => {
  const [searchInput, setSearchInput] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const featuredMenu = useMemo(
    () => menuData.filter(each => FEATURED_IDS.includes(each.id)),
    [menuData]
  )

  const categories = useMemo(
    () => [
      'All',
      ...CATEGORY_ORDER.filter(course =>
        menuData.some(dish => dish.mealType?.includes(course))
      )
    ],
    [menuData]
  )

  const filteredMenuData = useMemo(() => {
    const query = searchInput.trim().toLowerCase()

    // "All" shows only the curated shortlist; picking a course reveals every
    // dish in that course, including ones hidden from the default view.
    const pool =
      activeCategory === 'All'
        ? featuredMenu
        : menuData.filter(dish => dish.mealType?.includes(activeCategory))

    return pool.filter(dish => {
      if (!query) return true

      const haystack = [
        dish.name,
        dish.cuisine,
        ...(dish.tags || []),
        ...(dish.ingredients || [])
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(query)
    })
  }, [menuData, featuredMenu, searchInput, activeCategory])

  const resetFilters = () => {
    setSearchInput('')
    setActiveCategory('All')
  }

  return (
    <>
      <Navigation />

      <main className='menu-cont'>
        <header className='menu-hero'>
          <p className='menu-eyebrow'>Fresh from the kitchen</p>
          <h1 className='menu-head'>Our Menu</h1>
          <p className='menu-sub'>
            A tight, seasonal selection — every plate below is one we would
            happily put our name on.
          </p>
        </header>

        <div className='menu-controls'>
          <div className='search-wrap'>
            <FiSearch className='search-icon' aria-hidden='true' />
            <input
              type='search'
              className='search-bar'
              placeholder='Search dishes, cuisines or ingredients'
              aria-label='Search the menu'
              value={searchInput}
              onChange={event => setSearchInput(event.target.value)}
            />
            {searchInput && (
              <button
                type='button'
                className='search-clear'
                aria-label='Clear search'
                onClick={() => setSearchInput('')}
              >
                <FiX aria-hidden='true' />
              </button>
            )}
          </div>

          <div className='menu-chips' role='group' aria-label='Filter by course'>
            {categories.map(course => (
              <button
                key={course}
                type='button'
                className={`menu-chip ${activeCategory === course ? 'active' : ''}`}
                aria-pressed={activeCategory === course}
                onClick={() => setActiveCategory(course)}
              >
                {course}
              </button>
            ))}
          </div>

          <p className='menu-count' role='status'>
            {searchInput.trim()
              ? `${filteredMenuData.length} result${
                  filteredMenuData.length === 1 ? '' : 's'
                } for "${searchInput.trim()}"`
              : activeCategory === 'All'
                ? `Showing ${filteredMenuData.length} featured dishes`
                : `Showing ${filteredMenuData.length} dishes in ${activeCategory}`}
          </p>
        </div>

        {filteredMenuData.length === 0 ? (
          <div className='menu-empty'>
            <p className='empty-title'>No dishes match that search</p>
            <p className='empty-text'>
              Try a different dish name, or browse one of our courses above.
            </p>
            <button type='button' className='empty-btn' onClick={resetFilters}>
              Clear search & filters
            </button>
          </div>
        ) : (
          <div className='menu-grid' key={`${activeCategory}-grid`}>
            {filteredMenuData.map((each, index) => (
              <article
                className='menu-card'
                key={each.id}
                style={{ '--i': index }}
              >
                <div className='card-media'>
                  <img
                    src={each.image}
                    alt={each.name}
                    loading='lazy'
                    decoding='async'
                    width='320'
                    height='220'
                  />
                  <span className='cuisine-tag'>{each.cuisine}</span>
                  <span className='rating-tag'>
                    <FiStar aria-hidden='true' />
                    {Number(each.rating).toFixed(1)}
                  </span>
                </div>

                <div className='card-body'>
                  <h3 className='dish-name'>{each.name}</h3>

                  <ul className='card-stats'>
                    <li>
                      <FiClock aria-hidden='true' />
                      {each.prepTimeMinutes + each.cookTimeMinutes} min
                    </li>
                    <li>
                      <FiUsers aria-hidden='true' />
                      Serves {each.servings}
                    </li>
                    <li className='difficulty'>{each.difficulty}</li>
                  </ul>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}

export default MenuCard
