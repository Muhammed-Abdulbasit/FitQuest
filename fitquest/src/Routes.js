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
  // Define a state to store the user data
  const [userData, setUserData] = React.useState(null);

  // Callback function to receive user data from LoginScreen
  const handleLogin = (userData) => {
    setUserData(userData);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/ChallengeScreen" element={<ChallengeScreen />} />
        {/* Pass handleLogin as a prop to LoginScreen */}
        <Route path="/LoginScreen" element={<LoginScreen onLogin={handleLogin} />} />
        <Route path="/Registration" element={<RegistrationScreen />} />
        <Route path="/AchievementsScreen" element={<AchievementsScreen />} />
        <Route path="/LeaderboardScreen" element={<LeaderboardScreen />} />
        <Route path="/LogScreen" element={<LogScreen />} />
        <Route path="/ProfileScreen" element={<ProfileScreen />} />
      </Routes>
    </Router>
  );
};
