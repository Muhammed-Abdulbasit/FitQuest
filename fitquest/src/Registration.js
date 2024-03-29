import './Registration.css';
import { NavBar } from './NavBar';
import { Link } from 'react-router-dom';
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

const register =()=>{
    axios.post('http://localhost:8000/register', {
        Name: nameReg,
        email: emailReg,
        username: usernameReg ,
        password: passwordReg,
        birth: birthReg,
        gender: genderReg,
        height: heightReg,
        weight: weightReg
    }).then((response)=>{
        console.log(response);
    })
}

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
                
                    Name <input type='text' onChange={(e)=>{setName(e.target.value)}}/><br></br>
                    Email <input type='email' onChange={(e)=>{setEmail(e.target.value)}} /><br />
                    Username<input type='text'onChange={(e)=>{setUsername(e.target.value)}} /><br></br>
                Password <input type="password" id='password' name='password' onChange={(e)=>{setPassword(e.target.value)}}  /><br />
                Date of Birth <input type='date' onChange={(e)=>{setBirth(e.target.value)}} /><br></br>
                
                    Gender <input type='radio' name='gselect' className='gender' value="M" onChange={(e)=>{setGender(e.target.value)}} />M 
                    <input type='radio' name='gselect' className='gender' value={"F"} onChange={(e)=>{setGender(e.target.value)}} />F 
                    <br></br>
                    Height(ft) <input type='number' name='height' onChange={(e)=>{setHeight(e.target.value)}} /><br></br>
                    Weight(lb) <input type='number' name='weight'onChange={(e)=>{setWeight(e.target.value)}} /><br></br>



                   
                    <button onClick={register} >SignUp</button> Already have an account? <Link to='/LoginScreen'>Login</Link>

                
            </div>
        </div>
    );
}