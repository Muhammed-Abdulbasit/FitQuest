import './ChallengeScreen.css';
import { NavBar } from './components/NavBar';
import ChallengeCard from './components/ChallengeCard';
import treadmill from './images/treadmill.png'

export function ChallengeScreen() {
  return (
    <div>
        <NavBar/>
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
