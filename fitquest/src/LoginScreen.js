
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import './LoginScreen.css'


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
      if (response.data.Login) {
        localStorage.setItem("token", response.data.token)
        setLoginStatus("Successfully Logged In");
        setIsLoggedIn(true);
      } else {
        setLoginStatus("Login failed");
      }
    }).catch(error => {
      console.error('Error logging in:', error);
      setLoginStatus("An error occurred while logging in");
    });
  }

  if (isLoggedIn) {
    return <Navigate to="/HomeScreen"/>;

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
      <div className="LoginScreen">
        <div>
          <h1>Welcome to FitQuest</h1>
          <span>Please Enter Your Details To Log In</span>
        </div>
        <div className="form">
          <input type='email' placeholder='Enter Email' onChange={(e) => { setEmail(e.target.value) }} name='email' /><br></br>
          <input type="password" placeholder='Enter Password' id='password' onChange={(e) => { setPassword(e.target.value) }} name='password' />
        </div>
        Check Password <input type='checkbox' onClick={toggleVisibility} name='visible' />
        <div>
          <div>
            <button className='logbtn' onClick={login}>LogIn</button>
          </div>
          
          Need an account? {" "}
          <Link to={'/Registration'}>
           SignUp
          </Link>
        
          
     
        </div>
      </div>
      <h1 className='loginstatus'>{loginStatus}</h1>
    </div>
  );
}
