import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav className="nav-bar bg-dark y-3 p-3">
        <ul className='nav'>
            <li className='nav-items'>
                <Link to="/" className='nav-link text-white'>Home</Link>
            </li>
            <li className='nav-items'>
                <Link to="/contact" className='nav-link text-white'>Contact</Link>
            </li>
            <li className='nav-items'>
                <Link to="/about" className='nav-link text-white'>About</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar