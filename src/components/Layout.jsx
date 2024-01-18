import React from 'react'
import '../styles/global.css'
import Header from './Header'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className="wrapper">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
