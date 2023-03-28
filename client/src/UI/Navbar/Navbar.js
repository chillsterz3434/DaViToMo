import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import davitomo_logo2 from './Images/davitomo_logo2.png'

const Navbar = () => {
  return (
    <div className="topnav">
        <h1>
          <img src={davitomo_logo2} alt="Logo" />
        </h1>
        <Link to='/' className="nav-link">Home</Link>
        <Link to='/search' className='nav-link'>Search</Link>
        <Link to='/about' className='nav-link'>About</Link>
        <Link to='/contact' className='nav-link'>Contact</Link>
    </div>
  )
}

export default Navbar
