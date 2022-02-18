import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../forms/Button'
import FormInput from '../forms/FormInput'
import { signInWithGoogle, auth } from './../../firebase/utils'
import { signInWithEmailAndPassword } from 'firebase/auth'
import './styles.scss'
import AuthWrapper from '../AuthWrapper'

const initialState = {
  email: '',
  password: ''
}

const SignIn = (props) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState)

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password)
      setFormData(initialState)
      navigate('/')
    } catch (error) {
      // console.log(error)
    }
  }

  const { email, password } = formData

  const configAuthWrapper = {
    headline: 'LogIn'
  }

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          
          <FormInput 
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            handleChange={handleChange}
          />

          <FormInput 
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            handleChange={handleChange}
          />

          <Button type='submit'>
            Log In
          </Button>

          <div className="socialSignin">
            <div className="row">
              <Button onClick={signInWithGoogle}>
                Sign in with Google
              </Button>
            </div>
          </div>

          <div className='links'>
            <Link to='/recovery'>
              Reset Password
            </Link>
          </div>

        </form>
      </div>
    </AuthWrapper>
  )
}

export default SignIn