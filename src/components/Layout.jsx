import React from 'react'
import '../styles/global.css'
import Header from './UI/Header'
import Footer from './UI/Footer'

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
