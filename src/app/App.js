import React, { Component } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// components
import Header from '../components/Header'
import Footer from '../components/Footer'
import Homepage from '../pages/Homepage'
import Registration from '../pages/Registration'
import Login from '../pages/Login'

import { auth, handleUserProfile } from './../firebase/utils'
import { onSnapshot } from 'firebase/firestore'

import './default.scss'

const initialState = {
  currentUser: null
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      ...initialState
    }
  }

  authListener = null

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth)
        onSnapshot(userRef, snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }

      this.setState({
        ...initialState
      })
    })
  }

  componentWillUnmount() {
    this.authListener()
  }

  render() {
    const { currentUser } = this.state

    return (
      <div className="App">
        <Header currentUser={currentUser}/>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/registration' element={currentUser ? <Navigate to='/' /> : <Registration />} />
          <Route path='/login' element={currentUser ? <Navigate to='/' /> : <Login />} />
        </Routes>
        <Footer />
      </div>
    )
  }
}

export default App