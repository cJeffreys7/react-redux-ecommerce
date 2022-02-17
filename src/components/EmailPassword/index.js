import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthWrapper from '../AuthWrapper'
import Button from '../forms/Button'
import FormInput from '../forms/FormInput'

import { auth } from './../../firebase/utils'
import { sendPasswordResetEmail } from 'firebase/auth'
import './styles.scss'

// const initialState = {
//   email: ''
// }
//
// class EmailPassword extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       ...initialState
//     }

//     this.handleChange = this.handleChange.bind(this)
//   }

//   handleChange(e) {
//     const { name, value } = e.target
//     this.setState({
//       [name]: value
//     })
//   }

//   handleSubmit = async e => {
//     e.preventDefault()

//     try {
//       const { email } = this.state

//       const config = {
//         url: 'http://localhost:3000/login'
//       }

//       await sendPasswordResetEmail(auth, email, config)
//       .then(() => {
//         console.log('Password Reset')
//         this.props.history.push('/login')
//       })
//       .catch(() => {
//         console.log('Something went wrong')
//       })
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   render() {
//     const { email } = this.state

//     const configAuthWrapper = {
//       headline: 'Email Password'
//     }

//     return (
//       <AuthWrapper {...configAuthWrapper}>
//         <div className='formWrap'>
//           <form onSubmit={this.handleSubmit}>
//             <FormInput 
//               type='email'
//               name='email'
//               value={email}
//               placeholder='Email'
//               onChange={this.handleChange}
//             />
//             <Button type='submit'>
//               Email Password
//             </Button>
//           </form>
//         </div>
//       </AuthWrapper>
//     )
//   }
// }

// export default withRouter(EmailPassword)

export function ResetEmailPassword(props) {
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

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className='formWrap'>

        {formData.errors?.length > 0 && (
          <ul>
            {formData.errors.map((e, index) => {
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
            value={formData.email}
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

export default ResetEmailPassword