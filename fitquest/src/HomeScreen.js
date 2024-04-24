import './HomeScreen.css';
import { NavBar } from './components/NavBar';
import WorkoutCard from './components/WorkoutsCard';
import squat from './images/barbell_squat.avif'
import running from './images/running.png'
import curls from './images/curls.jpeg'
import stretching from './images/stretching.png'
import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export function HomeScreen() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);
  return (
    <div>
        <NavBar isLoggedIn={isLoggedIn}/>
      <div className="homescreen">
        <h1 id='welcome-message'>Welcome, {user.name}</h1>
        <h3>We recommend these workouts for you</h3>
        <div className='homescreen-cards'>
          <WorkoutCard title="Squats" desc="Barbell Squats are a great exercise for legs, specifically quads and overall lifting strength" img={squat}/>
          <WorkoutCard title="Stretches" desc="Stretches increase flexibility, improve range of motion, and reduce the chances of injury" img={stretching}/>
          <WorkoutCard title="Bicep Curls" desc="Bicep curls help build upper arm and pulling strength" img={curls}/>
          <WorkoutCard title="Running" desc="Running is great for improving stamina as well as cardiovascular and overall health" img={running}/>
        </div>
      </div>
      
    </div>
  );
}