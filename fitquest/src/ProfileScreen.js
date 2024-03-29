import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavBar } from './NavBar';
import './ProfileScreen.css';

export function ProfileScreen() {
  const [userData, setUserData] = useState(null); // State to store user data

  useEffect(() => {
    getUserData();
  }, []);

  function getUserData() {
    const authToken = localStorage.getItem('authToken'); // Retrieve the authentication token from localStorage
    if (!authToken) {
      console.error('Authentication token not found');
      return;
    }

    axios.get("http://localhost:8000/user", {
      headers: {
        Authorization: `Bearer ${authToken}` // Send the authentication token in the request headers
      }
    }).then(function (response) {
      setUserData(response.data); // Store user data in state
    }).catch(function (error) {
      console.error('Error fetching user data:', error);
    });
  }

  return (
    <div>
      <NavBar />
      <div className="profilescreen">
        <h1>Profile Screen</h1>
        {userData && (
          <div>
            <h2>User Information:</h2>
            <ul>
              <li>
                <strong>Name:</strong> {userData.name}<br />
                <strong>Email:</strong> {userData.email}<br />
                {/* Render other user information as needed */}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
