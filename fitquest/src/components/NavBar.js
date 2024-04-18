import './NavBar.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import Logo from '../images/Logo.webp';

export function NavBar() {
  const [isLinkDropdownOpen, setIsLinkDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const toggleDropdown = () => {
    setIsLinkDropdownOpen(!isLinkDropdownOpen);
  };

  return (
    <div>
      <div className="navbar">
        <ul>
          <li><button onClick={() => navigate('/HomeScreen')}>Home</button></li>
          <li><button onClick={() => navigate('/ChallengeScreen')}>Challenges</button></li>
          <li><button onClick={() => navigate('/AchievementsScreen')}>Achievements</button></li>
          <li><button onClick={() => navigate('/Leaderboard')}>Leaderboard</button></li>
          <li><button onClick={() => navigate('/LogScreen')}>Log</button></li>
          
          <li><div className="profile-icon" onClick={toggleDropdown}>
              <img src={Logo} alt='Profile Icon' />
              {isLinkDropdownOpen && <ProfileDropdown />}
              </div></li>
        </ul>
      </div>
    </div>
  );
}
