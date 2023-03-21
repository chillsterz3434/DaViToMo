import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="topnav">
        <h1>DaViToMo</h1>
        {/* <li><a href="/home">Home</a></li>
		<li><a href="/about">About</a></li>
		<li><a href="/contact">Contact</a></li> */}
        <Link to='/home' className="nav-link">Home</Link>
        <Link to='/about' className='nav-link'>About</Link>
        <Link to='/contact' className='nav-link'>Contact</Link>
    </div>
  )
}

export default Navbar
