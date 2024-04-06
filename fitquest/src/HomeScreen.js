import './HomeScreen.css';
import { NavBar } from './components/NavBar';
import WorkoutCard from './components/WorkoutsCard';
import squat from './images/barbell_squat.avif'
import running from "./images/running.png"

export function HomeScreen() {
  return (
    <div>
        <NavBar/>
      <div className="homescreen">
        <h1 id='welcome-message'>Welcome, Username</h1>
        <h3>We recommend these workouts for you</h3>
        <div className='homescreen-cards'>
          <WorkoutCard title="Squats" desc="Barbell Squats are a great exercise for legs" img={squat}/>
          <WorkoutCard title="Squats" desc="Barbell Squats are a great exercise for legs" img={running}/>
          <WorkoutCard title="Squats" desc="Barbell Squats are a great exercise for legs" img={squat}/>
          <WorkoutCard title="Squats" desc="Barbell Squats are a great exercise for legs" img={squat}/>
        </div>
      </div>
      
    </div>
  );
}