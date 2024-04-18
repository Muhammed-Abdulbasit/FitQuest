import './NavBar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import running from '../images/running.png';

export function NavBar({ isLoggedIn }) {
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
          <li><Link to='/AchievementsScreen'>Achievements</Link></li>
          <li><Link to='/Leaderboard'>Leaderboard</Link></li>
          <li><Link to='/LogScreen'>Log</Link></li>
          {isLoggedIn ? (
            <> <li><div className="profile-icon" onClick={toggleDropdown}>
            <img src={running} alt='Profile Icon' />
            {isLinkDropdownOpen && <ProfileDropdown />}
            </div></li>
            </>
          ) : (
            <li><Link to='/LoginScreen'>Login</Link></li>
          )}

         
        </ul>
      </div>
    </div>
  );
}