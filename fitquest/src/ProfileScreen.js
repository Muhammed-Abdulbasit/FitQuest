// ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { NavBar } from './components/NavBar';
import './ProfileScreen.css';

export function ProfileScreen() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  return (
    <div>
    <NavBar isLoggedIn={true}/>
    <div className="ProfileScreen">
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <p>Height: {user.height} feet</p>
      <p>Username: {user.weight} pounds</p>
      <p>Date Of Birth: {user.dob}</p>
      <p>Current XP: {user.xp} points</p>
    
    </div>
    </div>
  );
}
