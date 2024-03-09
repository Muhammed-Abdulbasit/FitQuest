import './HomeScreen.css';
import { NavBar } from './NavBar';

export function HomeScreen() {
  return (
    <div>
        <NavBar/>
      <div className="homescreen">
        <h1>FitQuest</h1>
      </div>
    </div>
  );
}