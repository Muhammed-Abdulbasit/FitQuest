import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeScreen } from './HomeScreen';
import { SecondScreen } from './SecondScreen';
import { LoginScreen } from './LoginScreen';
import { RegistrationScreen } from './Registration';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/SecondScreen" element={<SecondScreen />} />
        <Route path="/LoginScreen" element={<LoginScreen />} />
        <Route path="/Registration" element={<RegistrationScreen />} />
      </Routes>
    </Router>
  );
};