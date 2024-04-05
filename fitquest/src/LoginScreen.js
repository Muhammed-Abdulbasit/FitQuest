import './LoginScreen.css';
import { NavBar } from './components/NavBar';
import { Link } from 'react-router-dom';

export function LoginScreen() {

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
        <form>
          Email <input type='email' /><br />
          Password <input type="password" id='password' name='password' /><br />
         
          Check Password <input type='checkbox' onClick={toggleVisibility} name='visible'/><br />
          <input type='submit' value='Login' /> Need an account? <Link to='/Registration'>SignUp</Link>
       
        </form>
      </div>
    </div>
  );
}