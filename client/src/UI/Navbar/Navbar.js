import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import davitomo_logo2 from './Images/davitomo_logo2.png'

const Navbar = () => {
  return (
    <div className="topnav">
        <h1>
          <img src={davitomo_logo2} />
        </h1>
        {/* <li><a href="/home">Home</a></li>
		<li><a href="/about">About</a></li>
		<li><a href="/contact">Contact</a></li> */}
        <Link to='/' className="nav-link">Home</Link>
        <Link to='/about' className='nav-link'>About</Link>
        <Link to='/contact' className='nav-link'>Contact</Link>
        <Link to='/topics' className='nav-link'>Topics</Link>
    </div>
  )
}

export default Navbar
