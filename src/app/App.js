import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// hoc
import WithAuth from '../hoc/withAuth'

// pages
import Header from '../components/Header'
import Footer from '../components/Footer'
import Homepage from '../pages/Homepage'
import Registration from '../pages/Registration'
import Login from '../pages/Login'
import Recovery from '../pages/Recovery'
import Dashboard from '../pages/Dashboard'

import { setCurrentUser } from '../redux/User/user.actions'
import { connect } from 'react-redux'
import { auth, handleUserProfile } from './../firebase/utils'
import { onSnapshot } from 'firebase/firestore'

import './default.scss'

const App = (props) => {
  const { currentUser, setCurrentUser } = props

  // same as componentDidMount
  useEffect(() => {

    const authListener = auth.onAuthStateChanged(async userAuth => {
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

    // same as componentWillUnmount
    return () => {
      authListener()
    }
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/recovery' element={<Recovery />} />
        <Route path='/dashboard' element={
        <WithAuth>
          <Dashboard />
        </WithAuth>} />
      </Routes>
      <Footer />
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)