import React from 'react'
import './styles.scss'

import Logo from './../../assets/shopifyLogo.png'

export default function Header(props) {
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <img src={Logo} alt="Shopify Logo"/>
        </div>
      </div>
    </header>
  )
}