import { NavBar } from './components/NavBar';
import './AchievementsScreen.css'
import Achievement from './components/Badge';

export function AchievementsScreen() {
  return (
    <div>
        <NavBar/>
      <div className="achievements-screen">
        <h1>Achievements Screen</h1>
        <div className='list-achievements'>
          <Achievement />
          <Achievement />
          <Achievement />
          <Achievement />
          <Achievement />
          <Achievement />
          <Achievement />
        </div>
      </div>
    </div>
  );
}