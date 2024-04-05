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
          <li><Link to='/ChallengeScreen'>Challenges</Link></li>
          <li><Link to='/LoginScreen'>Login</Link></li>
          <li><div onClick={toggleDropdown}>Profile</div></li>
        </ul>
      </div>
    </div>
  );
}