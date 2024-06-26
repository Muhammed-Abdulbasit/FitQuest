import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeScreen } from './HomeScreen';
import { ChallengeScreen } from './ChallengeScreen';
import { LoginScreen } from './LoginScreen';
import { RegistrationScreen } from './Registration';
import { AchievementsScreen } from './AchievementsScreen';
import { LogScreen } from './LogScreen';
import { ProfileScreen } from './ProfileScreen';
import Leaderboard from './Leaderboard';

export const AppRoutes = () => {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/ChallengeScreen" element={<ChallengeScreen />} />
        {/* Pass handleLogin as a prop to LoginScreen */}
        <Route path="/LogScreen" element={<LogScreen  />} />
        <Route path="/Registration" element={<RegistrationScreen />} />
        <Route path="/AchievementsScreen" element={<AchievementsScreen />} />
        <Route path="/Leaderboard" element={<Leaderboard />} />
        <Route path="/HomeScreen" element={<HomeScreen />} />
        <Route path="/ProfileScreen" element={<ProfileScreen />} />
        <Route path='/LoginScreen' element={<LoginScreen/>} />
      </Routes>
    </Router>
  );
};
