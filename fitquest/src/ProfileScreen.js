import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { NavBar } from './components/NavBar';
import './ProfileScreen.css';
import axios from 'axios';

export function ProfileScreen() {
  const [user, setUser] = useState({});
  const [logEntries, setLogEntries] = useState([]);
  const [nutritionLogs, setNutritionLogs] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      fetchWorkoutLogs(decoded.id);
      fetchNutritionLogs(decoded.id);
    }
  }, []);

  const fetchWorkoutLogs = (userId) => {
    axios.get(`http://localhost:8000/workoutlog/${userId}`)
      .then((response) => {
        setLogEntries(response.data);
      })
      .catch((error) => {
        console.error('Error fetching workout log entries:', error);
        setLogEntries([]);
      });
  };

  const fetchNutritionLogs = (userId) => {
    axios.get(`http://localhost:8000/nutritionlog/${userId}`)
      .then((response) => {
        setNutritionLogs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching nutrition log entries:', error);
        setNutritionLogs([]);
      });
  };
  return (
    <div>
      <NavBar isLoggedIn={true}/>
      <div className="ProfileScreen">
        <h1>Welcome, {user.name}</h1>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
        <p>Height: {user.height} feet</p>
        <p>Weight: {user.weight} pounds</p>
        <p>Date Of Birth: {user.dob}</p>
        <p>Current XP: {user.xp} points</p>
      </div>
      <div className='Flex-Container'>
      <div className="LogEntriesBox">
        <table>
          <thead>
            <th colSpan={4}>Your Workout Log</th>
          </thead>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Type</th>
              <th>Duration</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {logEntries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.name}</td>
                <td>{entry.date}</td>
                <td>{entry.type}</td>
                <td>{entry.duration} mins</td>
                {/* Render more table cells with log entry data */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='food-log'>
      <table >
    <thead>
    <th colSpan={5}>Your Nutrition Log</th>
    </thead>
          
     
          <thead>
            <tr >
              <th >Name</th>
              <th >Calories</th>
              <th >Carbohydrates</th>
              <th >Proteins</th>
              <th >Date</th>
            </tr>
          </thead>
        
          <tbody>
          {Array.isArray(nutritionLogs) && nutritionLogs.map((log) => (
    <tr key={log.id}>
    <td>{log.name}</td>
      <td> {`${log.calories} cal`} </td>
    <td>{`${log.carbohydrates} grams`} </td>
    <td>{ `${log.protein} grams`}</td>
      <td>{ log.date}</td>
      </tr>
              ))}
      </tbody>
          </table>
      </div>
      </div>
    </div>
  );
}
