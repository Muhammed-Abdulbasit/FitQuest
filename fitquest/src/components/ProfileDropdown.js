import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileDropdown.css';

const ProfileDropdown = () => {
  return (
    <div className="profile-dropdown">
      <Link id= 'profile-dropdown-link' to="/ProfileScreen">Profile</Link>
      <Link id = 'profile-dropdown-link' to="/LoginScreen">Logout</Link>
    </div>
  );
};

export default ProfileDropdown;
