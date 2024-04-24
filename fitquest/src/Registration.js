import './Registration.css';
import { Link, Navigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export function RegistrationScreen() {
    const [nameReg, setName] = useState('');
    const [emailReg, setEmail] = useState('');
    const [usernameReg, setUsername] = useState('');
    const [passwordReg, setPassword] = useState('');
    const [birthReg, setBirth] = useState('');
    const [genderReg, setGender] = useState('');
    const [heightReg, setHeight] = useState('');
    const [weightReg, setWeight] = useState('');
    const[SignedUp, setSignUp] = useState(false);
    const[ SignUpStatus, setStatus] = useState('');

const register =()=>{
    if (!nameReg || !emailReg || !usernameReg || !passwordReg || !birthReg || !genderReg || !heightReg || !weightReg) {
        // Display an error message or handle the empty fields as needed
        console.error('Please fill in all fields');
        setStatus('Please fill in all fields');
        return;
    }

    axios.post('http://localhost:8000/register', {
        name: nameReg,
        email: emailReg,
        username: usernameReg ,
        password: passwordReg,
        birth: birthReg,
        gender: genderReg,
        height: heightReg,
        weight: weightReg
    }).then((response) => {
        localStorage.setItem("token", response.data.token)
        setSignUp(true);
        console.log(response);
    }).catch((error) => {
        // Handle registration failure
        console.error('Error registering:', error);
    });
}
if(SignedUp){
    return <Navigate to="/LoginScreen"/>;

}

    return (
        <div>
            
            <div className="RegistrationScreen">
                <div>
                <h1>Welcome to FitQuest</h1>
                <span>Start Signing Up Below</span>
                </div>
                
                <div>
                   Full Name<br></br> <input type='text' placeholder='Enter Name' width={100} onChange={(e)=>{setName(e.target.value)}}/><br></br>
                    Email <br></br><input type='email' placeholder='Enter Email' onChange={(e)=>{setEmail(e.target.value)}} /><br />
                    Username<br></br><input type='text' placeholder='Enter Username' onChange={(e)=>{setUsername(e.target.value)}} /><br></br>
                Password<br></br> <input type="password" placeholder='Enter Password' id='password' name='password' onChange={(e)=>{setPassword(e.target.value)}}  /><br />
                Date of Birth <br></br><input type='date'  onChange={(e)=>{setBirth(e.target.value)}} /><br></br>
                
                    Gender:<input type='radio' name='gselect' className='gender' value="M" onChange={(e)=>{setGender(e.target.value)}} />M 
                    <input type='radio' name='gselect' className='gender' value={"F"} onChange={(e)=>{setGender(e.target.value)}} />F 
                    <br></br><br></br>
                    Height<br></br> <input type='number' placeholder='Enter Height in Ft' width={100} name='height' onChange={(e)=>{setHeight(e.target.value)}} /><br></br>
                    Weight<br></br> <input type='number' placeholder='Enter Height in Ib' name='weight'onChange={(e)=>{setWeight(e.target.value)}} /><br></br>
                    </div>
                    <button className='logbtn' onClick={register} >SignUp</button> Already have an account? <Link to='/LoginScreen'>Login</Link>

                
            </div>
            <div className='status'>
            <h1>{SignUpStatus}</h1>
            </div>
            
        </div>
        
    );
}