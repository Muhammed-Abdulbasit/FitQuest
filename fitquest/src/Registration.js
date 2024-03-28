import './Registration.css';
import { NavBar } from './NavBar';
import { Link } from 'react-router-dom';

export function RegistrationScreen() {

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
            <div className="RegistrationScreen">
                <h1>Welcome to FitQuest</h1>
                <form>
                    Name <input type='text'/><br></br>
                    Email <input type='email' /><br />
                    Username<input type='text'/><br></br>
                Password <input type="password" id='password' name='password' /><br />
                Date of Birth <input type='date'/><br></br>
                
                    Gender <input type='radio' name='gselect' className='gender'/>M 
                    <input type='radio' name='gselect' className='gender' />F 
                    <br></br>
                    Height(ft) <input type='number' name='height'/><br></br>
                    Weight(lb) <input type='number' name='weight'/><br></br>



                   
                    <input type='submit' value='SignUp' /> Already have an account? <Link to='/LoginScreen'>Login</Link>

                </form>
            </div>
        </div>
    );
}