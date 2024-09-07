import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from './logo.jpeg'
import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className='logo'>
          <img src={logo} alt='logo' id='logo-image'/>
          <h4 id='logo-heading'>ARTS OF ASHIK</h4>
        </div>
        <div className="nav-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <a href="/" className="nav-links" style={{textDecoration:"none", color:"whitesmoke"}}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/main" className="nav-links" style={{textDecoration:"none", color:"whitesmoke"}}>
              Works
            </a>
          </li>
          <li className="nav-item">
            <a href="/scripts" className="nav-links" style={{textDecoration:"none", color:"whitesmoke"}}>
              Scripts
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-links" style={{textDecoration:"none", color:"whitesmoke"}}>
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-links" style={{textDecoration:"none", color:"whitesmoke"}}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;