import React, { Component } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// components
import Header from '../components/Header'
import Footer from '../components/Footer'
import Homepage from '../pages/Homepage'
import Registration from '../pages/Registration'
import Login from '../pages/Login'
import Recovery from '../pages/Recovery'

import { setCurrentUser } from '../redux/User/user.actions'
import { connect } from 'react-redux'
import { auth, handleUserProfile } from './../firebase/utils'
import { onSnapshot } from 'firebase/firestore'

import './default.scss'

class App extends Component {

  authListener = null

  componentDidMount() {
    const { setCurrentUser } = this.props

    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth)
        onSnapshot(userRef, snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      }

      setCurrentUser(userAuth)
    })
  }

  componentWillUnmount() {
    this.authListener()
  }

  render() {
    const { currentUser } = this.props

    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/registration' element={currentUser ? <Navigate to='/' /> : <Registration />} />
          <Route path='/login' element={currentUser ? <Navigate to='/' /> : <Login />} />
          <Route path='/recovery' element={<Recovery />} />
        </Routes>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)