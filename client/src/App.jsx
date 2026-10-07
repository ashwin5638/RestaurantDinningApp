import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute/protectedRoute'

import Home from './components/Home'
import MenuCard from './components/MenuCard'
import About from './components/About'
import Contact from './components/Contact'
import NotFound from './components/NotFound'
import Register from './components/Register'
import Login from './components/Login'
import Logout from './components/Logout'
import BookTable from './components/BookTable'

const App = () => {
  return (
    <Router>
      <Routes>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menucard" element={<MenuCard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route
          path="/book"
          element={
            <ProtectedRoute>
              <BookTable />
            </ProtectedRoute>
          }
        />

        {/* 404 — catch-all */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  )
}

export default App
