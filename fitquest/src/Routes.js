import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeScreen } from './HomeScreen';
import { SecondScreen } from './SecondScreen';
import { LoginScreen } from './LoginScreen';
import { RegistrationScreen } from './Registration';
import Leaderboard from './Leaderboard';
import Profile from './Profile';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/SecondScreen" element={<SecondScreen />} />
        <Route path="/LoginScreen" element={<LoginScreen />} />
        <Route path="/Registration" element={<RegistrationScreen />} />
        <Route path="/Leaderboard" element={<Leaderboard />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};