import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeScreen } from './HomeScreen';
import { ChallengeScreen } from './ChallengeScreen';
import { LoginScreen } from './LoginScreen';
import { RegistrationScreen } from './Registration';
import { AchievementsScreen } from './AchievementsScreen'
import { LeaderboardScreen } from './LeaderboardScreen'
import { LogScreen } from './LogScreen'
import { ProfileScreen } from './ProfileScreen'


export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/ChallengeScreen" element={<ChallengeScreen />} />
        <Route path="/LoginScreen" element={<LoginScreen />} />
        <Route path="/Registration" element={<RegistrationScreen />} />
        <Route path="/AchievementsScreen" element={<AchievementsScreen />} />
        <Route path="/LeaderboardScreen" element={<LeaderboardScreen />} />
        <Route path="/LogScreen" element={<LogScreen />} />
        <Route path="/ProfileScreen" element={<ProfileScreen />} />
      </Routes>
    </Router>
  );
};