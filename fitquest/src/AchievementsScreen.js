import { NavBar } from './components/NavBar';
import './AchievementsScreen.css'
import Achievement from './components/Badge';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const achievementColors = {
  Beginner: { dark: 'DarkBlue', light: 'DodgerBlue' },
  GettingStarted: { dark: 'DarkGreen', light: 'MediumSeaGreen' },
  Novice: { dark: '#780000', light: '#eb1540' },
  LearningAsYouGo: { dark: 'OrangeRed', light: 'DarkOrange' },
  Intermediate: { dark: 'DarkGoldenRod', light: 'Gold' },
  Intensifier: { dark: 'Indigo', light: '#9932CC' },
  MakingStrides: { dark: 'DarkOliveGreen', light: 'YellowGreen' },
  Advanced: { dark: '#1A1A1A', light: '#808080' }
};

export function AchievementsScreen() {
  const [user, setUser] = useState({});
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
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
      achievements.push({ name: 'Beginner', description: 'Earn a total of 100 XP ', color: achievementColors.Beginner });
    }
    if (userXP >= 200) {
      achievements.push({ name: 'Getting Started', description: 'Earn a total of 200 XP', color: achievementColors.GettingStarted });
    }
    if (userXP >= 300) {
      achievements.push({ name: 'Novice ', description: 'Earn a total of 300 XP', color: achievementColors.Novice });
    }
    if (userXP >= 400) {
      achievements.push({ name: 'Learning as You Go', description: 'Earn a total of 400 XP', color: achievementColors.LearningAsYouGo });
    }
    if (userXP >= 500) {
      achievements.push({ name: 'Intermediate', description: 'Earn a total of 500 XP', color: achievementColors.Intermediate });
    }
    if (userXP >= 600) {
      achievements.push({ name: 'Intensifier', description: 'Earn a total of 600 XP', color: achievementColors.Intensifier });
    }
    if (userXP >= 700) {
      achievements.push({ name: 'Making Strides', description: 'Earn a total of 700 XP', color: achievementColors.MakingStrides });
    }
    if (userXP >= 800) {
      achievements.push({ name: 'Advanced', description: 'Earn a total of 800 XP', color: achievementColors.Advanced });
    }
    return achievements;
  }
  
  return (
    <div>
      <NavBar />
      <div className="achievements-screen">
        <h1>Achievements</h1>
        <div className='list-achievements'>
          {unlockedAchievements && unlockedAchievements.length > 0 ? (
            unlockedAchievements.map((achievement, index) => (
              <Achievement key={index} name={achievement.name} description={achievement.description} color={achievement.color} />
            ))
          ) : (
            <p>No achievements unlocked yet.</p>
          )}
        </div>
      </div>
    </div>
  );
  
}