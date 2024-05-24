import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { meterService } from '../services/meter.service'
import { loggedInUserContext } from '../services/context'
function LoginPage() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({})
  const [loggedInUser, setLoggedInUser] = useContext(loggedInUserContext)
  const [showLoginForm, setShowLoginForm] = useState(false)

  useEffect(() => {
    const fetchUserAndNavigate = async () => {
      try {
        const user = await meterService.getUser()
        if (user) {
          setLoggedInUser(user)
          navigate('/home')
        } else setShowLoginForm(true)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUserAndNavigate()
  }, [])

  const login = async (ev) => {
    ev.preventDefault()
    try {
      const user = await meterService.login(credentials)
      if (user) navigate('/home')
      else alert('שם משתמש או סיסמא אינם תקינים', 'error')
    } catch (error) {
      console.log(error)
    }
  }

  const handleLoginForm = (e) => {
    const { name, value } = e.target
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }))
  }

  return (
    <>
      {showLoginForm && (
        <form className='login-form' onSubmit={login}>
          <input
            type='text'
            name='username'
            placeholder='שם משתמש'
            onChange={handleLoginForm}
          />
          <input
            type='password'
            name='password'
            placeholder='סיסמא'
            onChange={handleLoginForm}
          />
          <button type='submit'>התחבר</button>
        </form>
      )}
    </>
  )
}

export default LoginPage
