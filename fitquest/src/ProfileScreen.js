// ProfileScreen.js
import React from 'react';
import { NavBar } from './components/NavBar';
import './Profile.css';

export function ProfileScreen({ user }) {
  // Ensure user data is defined before accessing its properties
  if (!user) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="profile">
        <h2>User Profile</h2>
        <div className="profile-info">
          <div>
            <label>Name:</label>
            <span>{user.name}</span>
          </div>
          <div>
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
          {/* Add more profile information here */}
        </div>
      </div>
    </div>
  );
}
