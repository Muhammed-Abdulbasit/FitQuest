import './HomeScreen.css';
import { NavBar } from './components/NavBar';
import WorkoutCard from './components/WorkoutsCard';
import squat from './images/barbell_squat.avif'
import running from './images/running.png'
import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export function HomeScreen() {
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
        <NavBar/>
      <div className="homescreen">
        <h1 id='welcome-message'>Welcome, {user.name}</h1>
        <h3>We recommend these workouts for you</h3>
        <div className='homescreen-cards'>
          <WorkoutCard title="Squats" desc="Barbell Squats are a great exercise for legs" img={squat}/>
          <WorkoutCard title="Squats" desc="Barbell Squats are a great exercise for legs" img={running}/>
          <WorkoutCard title="Squats" desc="Barbell Squats are a great exercise for legs" img={squat}/>
          <WorkoutCard title="Squats" desc="Barbell Squats are a great exercise for legs" img={squat}/>
        </div>
      </div>
      
    </div>
  );
}