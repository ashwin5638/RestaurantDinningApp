import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE } from '../../services/api'
import './index.css'


const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")


  const navigate = useNavigate()


  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Registration failed')
        return
      }


      navigate('/login')

    } catch (e) {
      setError('Something went wrong')
    }
  }


  const handleUsername = (event) => {
    setUsername(event.target.value)
  }


  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div className='container1'>
      <form onSubmit={handleRegister} className='regist-container'>

        <h2 className='head-login'>Create Account</h2>

        <input
          type="text"
          placeholder='Username'
          className='input1'
          onChange={handleUsername}
          required
        />
        <input
          type="email"
          placeholder='Email'
          className='input1'
          onChange={handleEmail}
          required
        />
        {/* Changed type to password for security */}
        <input
          type="password"
          placeholder='Password'
          className='input1'
          onChange={handlePassword}
          required
          
        />

        <button className='button' type="submit">Sign Up</button>

        {error && <p className='para1'>{error}</p>}
      </form>
    </div>
  )



}

export default Register
