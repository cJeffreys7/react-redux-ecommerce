import React, { Component } from 'react'
import Buttons from '../forms/Buttons'
import { signInWithGoogle } from './../../firebase/utils'
import './styles.scss'

class SignIn extends Component {

  handleSubmit = async e => {
    e.preventDefault()
  }

  render() {
    return (
      <div className="signin">
        <div className="wrap">
          <h2>
            Login
          </h2>
  
          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
              <div className="socialSignin">
                <div className="row">
                  <Buttons onClick={signInWithGoogle}>
                    Sign in with Google
                  </Buttons>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default SignIn