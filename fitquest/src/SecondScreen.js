import './SecondScreen.css';
import { NavBar } from './components/NavBar';

export function SecondScreen() {
  return (
    <div>
        <NavBar/>
        <div className="secondscreen">
        <h1>Second Screen</h1>
        </div>
    </div>
  );
}
