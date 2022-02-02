import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

import Logo from './../../assets/logo.png'

export default function Header(props) {
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to='/'>
            <img src={Logo} alt="Shopify Logo"/>
          </Link>
        </div>

        <div className="callToActions">
          <ul>
            <li>
              <Link to='/registration'>
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}