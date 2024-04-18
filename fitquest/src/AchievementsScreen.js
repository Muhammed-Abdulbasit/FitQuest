import { NavBar } from './components/NavBar';
import './AchievementsScreen.css'
import Achievement from './components/Badge';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export function AchievementsScreen() {
  const [user, setUser] = useState({});
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const decoded = jwtDecode(token);
      setUser(decoded);
      const userXP = decoded.xp; // Assuming XP is stored in a property named 'xp'
      const unlockedAchievements = determineUnlockedAchievements(userXP);
      setUnlockedAchievements(unlockedAchievements);
    }
  }, []);

  const determineUnlockedAchievements = (userXP) => {
    // Logic to determine unlocked achievements based on user's XP
    // For example:
    const achievements = [];
    if (userXP >= 100) {
      achievements.push({ name: 'Beginner', description: 'Earn a total of 100 XP ' });
    }
    if (userXP >= 200) {
      achievements.push({ name: 'Getting Started', description: 'Earn a total of 200 XP' });
    }
    if (userXP >= 300) {
      achievements.push({ name: 'Novice ', description: 'Earn a total of 300 XP' });
    }
    if (userXP >= 400) {
      achievements.push({ name: 'Learning as You Go', description: 'Earn a total of 400 XP' });
    }
    if (userXP >= 500) {
      achievements.push({ name: 'Intermediate', description: 'Earn a top of 500 XP' });
    }
    if (userXP >= 600) {
      achievements.push({ name: 'Intensifier', description: 'Earn a total of 600 XP' });
    }
    if (userXP >= 700) {
      achievements.push({ name: 'Making Strides', description: 'Earn a total of 700 XP' });
    }
    if (userXP >= 800) {
      achievements.push({ name: 'Advanced', description: 'Earn a total of 800 XP' });
    }
    return achievements;
  }
  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="achievements-screen">
        <h1>Achievements Screen</h1>
        <div className='list-achievements'>
          {unlockedAchievements && unlockedAchievements.length > 0 ? (
            unlockedAchievements.map((achievement, index) => (
              <Achievement key={index} name={achievement.name} description={achievement.description} />
            ))
          ) : (
            <p>No achievements unlocked yet.</p>
          )}
        </div>
      </div>
    </div>
  );
  
}