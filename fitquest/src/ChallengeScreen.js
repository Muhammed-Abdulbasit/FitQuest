import './ChallengeScreen.css';
import { NavBar } from './components/NavBar';
import ChallengeCard from './components/ChallengeCard';
import treadmill from './images/treadmill.png'
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

export function ChallengeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div>
        <NavBar isLoggedIn={isLoggedIn}/>
        <div className="challenge-screen">
        <h2 id='challenges-message'>This Weeks Challenges</h2>
          <div className='challenge-screen-cards'>
            <ChallengeCard title="Running" xp= "25 xp" desc="Run or jog for 30 minutes outdoors or on a treadmill. Or Both!" img={treadmill}/>
            <ChallengeCard title="Running" xp= "25 xp" desc="Run or jog for 30 minutes outdoors or on a treadmill. Or Both!" img={treadmill}/>
            <ChallengeCard title="Running" xp= "25 xp" desc="Run or jog for 30 minutes outdoors or on a treadmill. Or Both!" img={treadmill}/>
            <ChallengeCard title="Running" xp= "25 xp" desc="Run or jog for 30 minutes outdoors or on a treadmill. Or Both!" img={treadmill}/>
            <ChallengeCard title="Running" xp= "25 xp" desc="Run or jog for 30 minutes outdoors or on a treadmill. Or Both!" img={treadmill}/>
            <ChallengeCard title="Running" xp= "25 xp" desc="Run or jog for 30 minutes outdoors or on a treadmill. Or Both!" img={treadmill}/>
            <ChallengeCard title="Running" xp= "25 xp" desc="Run or jog for 30 minutes outdoors or on a treadmill. Or Both!" img={treadmill}/>
            <ChallengeCard title="Running" xp= "25 xp" desc="Run or jog for 30 minutes outdoors or on a treadmill. Or Both!" img={treadmill}/>
            
          </div>
        </div>
    </div>
  );
}
