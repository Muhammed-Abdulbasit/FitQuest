import { NavBar } from './components/NavBar';
import React, { useState, useEffect } from 'react';
import './LogScreen.css'
import axios from 'axios';


export function LogScreen() {
  const [workoutName, setworkoutName] = useState("");
  const [workoutTime, setworkoutTime] = useState("");
  const [workoutDate, setworkoutDate] = useState("");
  const [workoutType, setworkoutType] = useState("");
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [foodName, setfoodName] = useState("");
  const [calorie, setCalorie] = useState("");
  const [carb, setCarb] = useState("");
  const [protein, setProtein] = useState("");
  const [foodDate, setFoodDate] = useState("");
  const [nutrtionLogs, setNutritionLogs] = useState([]);

  const addWorkoutLog =()=>{
    axios.post('http://localhost:8000/workoutlog', {
        name: workoutName,
        duration: workoutTime,
        type: workoutType,
        date: workoutDate
    }).then((response) => {
        console.log(response);
        fetchWorkoutLogs();
    }).catch((error) => {
        // Handle registration failure
        console.error('Error Inputting:', error);
    });
}
const fetchWorkoutLogs = () => {
  axios.get('http://localhost:8000/workoutlog')
    .then((response) => {
      setWorkoutLogs(response.data);
    })
    .catch((error) => {
      console.error('Error fetching workout logs:', error);
    });
};
const deleteWorkoutLog = async (id) => {

  try {
    await axios.delete(`http://localhost:8000/workoutlog/${id}`);
    console.log('Workout log deleted successfully');
  window.location.reload();
  } catch (error) {
    console.error('Error deleting workout log:', error);
  }
};

const addNutritionLog = () =>{
axios.post("http://localhost:8000/nutritionlog",{
name: foodName,
calorie: calorie,
carbs : carb,
protein: protein,
date: foodDate
}).then((response) => {
  console.log(response);
  fetchNutritionLogs();
}).catch((error) => {
  // Handle registration failure
  console.error('Error Inputting:', error);
});
}
const fetchNutritionLogs = () => {
  axios.get('http://localhost:8000/nutritionlog')
    .then((response) => {
      setNutritionLogs(response.data);
    })
    .catch((error) => {
      console.error('Error fetching workout logs:', error);
    });
};
const deleteNutritionLog = async (id) => {

  try {
    await axios.delete(`http://localhost:8000/nutritionlog/${id}`);
    console.log('Nutrition log deleted successfully');
   window.location.reload();
  } catch (error) {
    console.error('Error deleting nutrition log:', error);
  }
};

useEffect(() =>{
  fetchWorkoutLogs();
fetchNutritionLogs();
}, []);
  return (
    <div>
        <NavBar/>
      <div className="log-screen">
        <h1>Workout Log</h1>
      </div>
      <div className='log'>



      <div className='workout-log'>
          <table >
          <thead>
            <tr >
              <th >Name</th>
              <th >Type</th>
              <th >Duration</th>
              <th >Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <td><input type='text' name='workoutname'  onChange={(e) => { setworkoutName(e.target.value) }}></input></td>
            <td>
            <select onChange={(e) => {setworkoutType(e.target.value)}}>
            <option>Select</option>
            <option>Strength</option>
            <option>Cardio</option>
            <option>Balance</option>
            <option>Flexibility</option>
            <option>Aerobic</option>
        </select>
            </td>
            <td><input type='number' name='workoutTime' placeholder={'Enter In Mins'}  onChange={(e) => { setworkoutTime(e.target.value) }}></input></td>
            <td><input type='date' name='workoutDate' onChange={(e)=>{ setworkoutDate(e.target.value)}}></input></td>
            <td><input type='submit'  name='workoutSubmit' value={'Add New Row'} onClick={addWorkoutLog}></input></td>
          </tbody>
          <tbody>
          {workoutLogs.map((log) => (
               <tr key={log.id}>
                  <td>{log.name}</td>
                  <td>{log.type}</td>
                  <td>{log.duration} mins</td>
                  <td>{log.date}</td>
                  <td>
                    <button> Edit</button>
                    <button onClick={() => deleteWorkoutLog(log.id)}>Delete</button>
                    </td>
                </tr>
              ))}
      </tbody>
          </table>
      </div>
      <div className="log-screen">
        <h1>Food Log</h1>
      </div>
      <div className='food-log'>
      <table >
          <thead>
            <tr >
              <th >Name</th>
              <th >Calories</th>
              <th >Carbohydrates</th>
              <th >Proteins</th>
              <th >Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <td><input type='text' name='foodName' onChange={(e) => { setfoodName(e.target.value) }}></input></td>
            <td><input type='number' name='foodCalorie' onChange={(e) => {setCalorie(e.target.value)}} ></input></td>
            <td><input type='number' name='foodCarb' placeholder='Enter in grams' onChange={(e) => {setCarb(e.target.value)}}></input></td>
            <td><input type='number' name='foodProtein' placeholder='Enter in grams' onChange={(e)=>{setProtein(e.target.value)}}></input></td>
            <td><input type='date' name='foodDate' onChange={(e)=>{setFoodDate(e.target.value)}}></input></td>
            <td><input type='submit' name='foodSubmit'
              onClick={addNutritionLog}
              value={'Add New Row'}></input></td>
          </tbody>
          <tbody>
          {nutrtionLogs.map((log) => (
                  <tr key={log.id}>
                  <td>{log.name}</td>
                  <td>{log.calories}</td>
                  <td>{log.carbohydrates} grams</td>
                  <td>{log.protein} grams</td>
                  <td>{log.date}</td>
                  <td>
                    <button>Edit</button>
                    <button onClick={() => deleteNutritionLog(log.id)}>Delete</button>
                    </td>
                </tr>
              ))}
      </tbody>
          </table>
      </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>  
    
  );
}