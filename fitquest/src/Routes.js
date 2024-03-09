import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeScreen } from './HomeScreen';
import { SecondScreen } from './SecondScreen';
import { ThirdScreen } from './ThirdScreen';

export const AppRoutes = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/SecondScreen" element={<SecondScreen />} />
          <Route path="/ThirdScreen" element={<ThirdScreen />} />
        </Routes>
      </Router>
    );
};