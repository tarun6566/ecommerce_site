import React from 'react'
import {Navbar,Footer} from './index'

export default function Layout({children}) {
  return (
    <div>
      <header>
        <Navbar/>
      </header>
      <main className='main-container'>
      {children}
      </main>
      <Footer/>
    </div>
  )
}
