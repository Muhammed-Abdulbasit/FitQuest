import { useState } from 'react';
import './LoginScreen.css';
import { NavBar } from './NavBar';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    axios.post("http://localhost:8000/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.message === "Successfully Logged In") {
        setLoginStatus(response.data.message);
        setIsLoggedIn(true); // Set isLoggedIn to true after successful login
      } else {
        setLoginStatus("Login failed"); // Handle login failure
      }
    }).catch(error => {
      console.error('Error logging in:', error);
      setLoginStatus("An error occurred while logging in");
    });
  }

  if (isLoggedIn) {
    return <Navigate to="/ProfileScreen"/>;
  }

  const toggleVisibility = () => {
    var visible = document.getElementById('password');
    if (visible.type === 'password') {
      visible.type = 'text';
    } else {
      visible.type = 'password';
    }
  }

  return (
    <div>
      <NavBar />
      <div className="LoginScreen">
        <h1>Welcome to FitQuest</h1>
        <label htmlFor='email'>Email</label>
        <input type='email' placeholder='Enter Email' onChange={(e) => { setEmail(e.target.value) }} name='email' /><br />
        Password <input type="password" placeholder='Enter Password' id='password' onChange={(e) => { setPassword(e.target.value) }} name='password' /><br />
        Check Password <input type='checkbox' onClick={toggleVisibility} name='visible' /><br />
        <button className='logbtn' onClick={login}>LogIn</button> Need an account? <Link to='/Registration'>SignUp</Link>
      </div>
      <h1 className='loginstatus'>{loginStatus}</h1>
    </div>
  );
}
