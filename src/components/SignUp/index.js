import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../forms/Button'
import FormInput from '../forms/FormInput'
import AuthWrapper from '../AuthWrapper'
import { auth, handleUserProfile } from './../../firebase/utils'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import './styles.scss'

const initialState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: []
}

const Signup = (props) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = async e => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      const err = ["Passwords don't match"]
      setFormData({
        ...formData,
        errors: err
      })
      return
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password)

      await handleUserProfile(user, { displayName })

      setFormData(initialState)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const { displayName, email, password, confirmPassword, errors } = formData

  const configAuthWrapper = {
    headline: 'Registration'
  }

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className='formWrap'>
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return (
                <li key={index}>
                  {err}
                </li>
              )
            })}
          </ul>
        )}
        <form onSubmit={handleFormSubmit}>
          <FormInput 
            type='text'
            name='displayName'
            value={displayName}
            placeholder='Full name'
            onChange={handleChange}
          />

          <FormInput 
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={handleChange}
          />

          <FormInput 
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={handleChange}
          />

          <FormInput 
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={handleChange}
          />

          <Button>
            Register
          </Button>
        </form>
      </div>
    </AuthWrapper>
  )
}

export default Signup