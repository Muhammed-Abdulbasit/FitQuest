import React from 'react';
import './Profile.css'; // Import CSS file for styling

const Profile = ({ user }) => {
  return (
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
  );
};

export default Profile;