import './ChallengeScreen.css';
import { NavBar } from './components/NavBar';
import ChallengeCard from './components/ChallengeCard';
import treadmill from './images/treadmill.png'

import { useEffect, useState } from 'react';
import  axios from 'axios';
export function ChallengeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [challenges, setChallenges] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
     
      setIsLoggedIn(true);
    }
    axios.get('http://localhost:8000/challenges')
      .then(response => {
        setChallenges(response.data); // Assuming the response data is an array of challenges
      })
      .catch(error => {
        console.error('Error fetching challenges:', error);
      });

  }, []);
  return (
    <div>
        <NavBar isLoggedIn={isLoggedIn}/>
        <div className="challenge-screen">
        <h2 id='challenges-message'>This Weeks Challenges</h2>
        <h5>Click On A challenge Once You Complete It</h5>
          <div className='challenge-screen-cards'>
          {challenges.map(challenge => (
        <ChallengeCard
          title={challenge.name}
          desc={challenge.info}
          xp={challenge.xp_val}
          img={treadmill}
        />
      ))}
         
          </div>
        </div>
    </div>
  );
}
