import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { API_BASE } from '../../services/api'
import "./index.css"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const onChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value)
  }



  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message)
        return
      }

      localStorage.setItem('token', data.token)


      navigate('/book', { replace: true })

    } catch (e) {
      setError('Something went wrong')
    }
  }

  return (
    <div className='container1'>

      <form className='regist-container' onSubmit={handleLogin}>
        <h1 className='head-login'>Login</h1>
        <input placeholder='Email' className='input1' onChange={onChangeEmail} />
        <input placeholder='password' type='password' className='input1' onChange={onChangePassword} />
        <button className='button' type='submit'>Login</button>
        {error && <p className='para1'>{error}</p>}
        <p className='para-signup'>don't have account yet <span>
          <Link to='/register' className='signUp-link'> signUp</Link>
        </span> </p>
      </form>
    </div>
  )
}

export default Login
