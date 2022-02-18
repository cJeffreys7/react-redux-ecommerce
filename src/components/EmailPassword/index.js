import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthWrapper from '../AuthWrapper'
import Button from '../forms/Button'
import FormInput from '../forms/FormInput'

import { auth } from './../../firebase/utils'
import { sendPasswordResetEmail } from 'firebase/auth'
import './styles.scss'

export function ResetPassword(props) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    errors: []
  })

  const configAuthWrapper = {
    headline: 'Email Password'
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const config = {
        url: 'http://localhost:3000/login'
      }

      await sendPasswordResetEmail(auth, formData.email, config)
      .then(() => {
        console.log('Password Reset')
        navigate('/')
      })
      .catch(() => {
        const err = ['Email not found. Please try again.']
        setFormData({
          ...formData,
          errors: err
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  const { email, errors } = formData

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className='formWrap'>

        {errors?.length > 0 && (
          <ul>
            {errors.map((e, index) => {
              return (
                <li key={index}>
                  {e}
                </li>
              )
            })}
          </ul>
        )}

        <form onSubmit={handleSubmit}>
          <FormInput 
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={handleChange}
          />
          <Button type='submit'>
            Email Password
          </Button>
        </form>
      </div>
    </AuthWrapper>
  )
}

export default ResetPassword