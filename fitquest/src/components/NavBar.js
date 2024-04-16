import './NavBar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function NavBar() {
  const [isLinkDropdownOpen, setIsLinkDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsLinkDropdownOpen(!isLinkDropdownOpen);
  };

  return (
    <div>
      <div className="navbar">
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/SecondScreen'>Second</Link></li>
          <li><Link to='/LoginScreen'>Login</Link></li>
          <li><Link to='/Leaderboard'>Leaderboard</Link></li>
          <li><Link to='/Profile'>Profile</Link> </li>
        </ul>
      </div>
    </div>
  );
}