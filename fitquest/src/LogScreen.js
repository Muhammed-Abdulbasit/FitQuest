import { NavBar } from './components/NavBar';
import React, { useState, useEffect } from 'react';
import './LogScreen.css'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export function LogScreen() {
  const [workoutName, setworkoutName] = useState("");
  const [workoutTime, setworkoutTime] = useState("");
  const [workoutDate, setworkoutDate] = useState("");
  const [workoutType, setworkoutType] = useState("");
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [editWorkoutLog, setEditWorkoutLog] = useState(null);
  const [foodName, setfoodName] = useState("");
  const [calorie, setCalorie] = useState("");
  const [carb, setCarb] = useState("");
  const [protein, setProtein] = useState("");
  const [foodDate, setFoodDate] = useState("");
  const [nutrtionLogs, setNutritionLogs] = useState([]);
  const [editNutritionLog, setEditNutritionLog] = useState(null);
  const [totalWorkoutMinutes, setTotalWorkoutMinutes] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
const handleEditWorkoutLog = (log) => {
  setEditWorkoutLog(log);
};
// Function to update workout log
const updateWorkoutLog = async (id) => {
  try {
    await axios.put(`http://localhost:8000/workoutlog/${id}`, editWorkoutLog);
    console.log('Workout log updated successfully');
    setEditWorkoutLog(null); // Reset editWorkoutLog state
    fetchWorkoutLogs(); // Fetch updated logs
  } catch (error) {
    console.error('Error updating workout log:', error);
  }
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
const handleEditNutritionLog = (log) => {
  setEditNutritionLog(log);
};
// Function to update workout log
const updateNutritionLog = async (id) => {
  try {
    await axios.put(`http://localhost:8000/nutritionlog/${id}`, editNutritionLog);
    console.log('Nutrition log updated successfully');
    setEditNutritionLog(null); // Reset editNutritionLog state
    fetchNutritionLogs(); // Fetch updated logs
  } catch (error) {
    console.error('Error updating nutrition log:', error);
  }
};

const fetchTotalWorkoutMinutes = () => {
  axios.get('http://localhost:8000/totalWorkoutMinutes')
    .then((response) => {
      setTotalWorkoutMinutes(response.data.totalMinutes);
    })
    .catch((error) => {
      console.error('Error fetching total workout minutes:', error);
    });
};

useEffect(() =>{
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    setIsLoggedIn(true);
  }
  fetchWorkoutLogs();
fetchNutritionLogs();
fetchTotalWorkoutMinutes();
}, []);

return (
  <div>
    <NavBar isLoggedIn={isLoggedIn} />
    <div className="log-screen">
         <div className='total'>
    <p>Total Workout Minutes: {totalWorkoutMinutes}</p>
  </div>

      <h1>Workout Log</h1>
    </div>
    <div className='log'>

      <div className='workout-log'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td><input type='text' name='workoutname' value={workoutName} onChange={(e) => { setworkoutName(e.target.value) }}></input></td>
                <td>
                  <select value={workoutType} onChange={(e) => { setworkoutType(e.target.value) }}>
                    <option>Select</option>
                    <option>Strength</option>
                    <option>Cardio</option>
                    <option>Balance</option>
                    <option>Flexibility</option>
                    <option>Aerobic</option>
                  </select>
                </td>
                <td><input type='number' name='workoutTime' placeholder={'Enter In Mins'} value={workoutTime} onChange={(e) => { setworkoutTime(e.target.value) }}></input></td>
                <td><input type='date' name='workoutDate' value={workoutDate} onChange={(e) => { setworkoutDate(e.target.value) }}></input></td>
                <td><input type='submit' name='workoutSubmit' value={'Add New Row'} onClick={addWorkoutLog}></input></td>
              </tr>
            </tbody>
            <tbody>
            {Array.isArray(workoutLogs) && workoutLogs.map((logData) => (
    <tr key={logData.id}>
                  <td>
                    {editWorkoutLog && editWorkoutLog.id === logData.id ? (
                      <input type="text" value={editWorkoutLog.name} onChange={(e) => setEditWorkoutLog({ ...editWorkoutLog, name: e.target.value })} />
                    ) : logData.name}
                  </td>
                  <td>
                    {editWorkoutLog && editWorkoutLog.id === logData.id ? (
                      <select value={editWorkoutLog.type} onChange={(e) => setEditWorkoutLog({ ...editWorkoutLog, type: e.target.value })}>
                        <option value="Strength">Strength</option>
                        <option value="Cardio">Cardio</option>
                        <option value="Balance">Balance</option>
                        <option value="Flexibility">Flexibility</option>
                        <option value="Aerobic">Aerobic</option>
                      </select>
                    ) : logData.type}
                  </td>
                  <td>
                    {editWorkoutLog && editWorkoutLog.id === logData.id ? (
                      <input type="number" value={editWorkoutLog.duration} onChange={(e) => setEditWorkoutLog({ ...editWorkoutLog, duration: e.target.value })} />
                    ) : `${logData.duration} mins`}
                  </td>
                  <td>
                    {editWorkoutLog && editWorkoutLog.id === logData.id ? (
                      <input type="date" value={editWorkoutLog.date} onChange={(e) => setEditWorkoutLog({ ...editWorkoutLog, date: e.target.value })} />
                    ) : logData.date}
                  </td>
                  <td>
                    {editWorkoutLog && editWorkoutLog.id === logData.id ? (
                      <button onClick={() => updateWorkoutLog(logData.id)}>Save</button>
                    ) : (
                      <>
                        <button onClick={() => handleEditWorkoutLog(logData)}>Edit</button>
                        <button onClick={() => deleteWorkoutLog(logData.id)}>Delete</button>
                      </>
                    )}
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
          {Array.isArray(nutrtionLogs) && nutrtionLogs.map((log) => (
    <tr key={log.id}>
                       <td>
                    {editNutritionLog && editNutritionLog.id === log.id ? (
                      <input type="text" value={editNutritionLog.name} onChange={(e) => setEditNutritionLog({ ...editNutritionLog, name: e.target.value })} />
                    ) : log.name}
                  </td>
                  <td>
      {editNutritionLog && editNutritionLog.id === log.id ? (
        <input type='number' value={editNutritionLog.calorie} onChange={(e) => { setEditNutritionLog({ ...editNutritionLog, calorie: e.target.value }) }}></input>
      ) : `${log.calories} cal`}
    </td>
    <td>
      {editNutritionLog && editNutritionLog.id === log.id ? (
        <input type='number' value={editNutritionLog.carb} onChange={(e) => { setEditNutritionLog({ ...editNutritionLog, carbs: e.target.value }) }}></input>
      ) : `${log.carbohydrates} grams`}
    </td>

    <td>
      {editNutritionLog && editNutritionLog.id === log.id ? (
        <input type='number' value={editNutritionLog.protein} onChange={(e) => { setEditNutritionLog({ ...editNutritionLog, protein: e.target.value }) }}></input>
      ) : `${log.protein} grams`}
    </td>
                  <td>
                  {editNutritionLog && editNutritionLog.id === log.id ? (
        <input type='date' value={editNutritionLog.date} onChange={(e) => { setEditNutritionLog({ ...editNutritionLog, date: e.target.value }) }}></input>
      ) : log.date}</td>
               
                  <td>
                    {editNutritionLog && editNutritionLog.id === log.id ?(
                      <button onClick={() => updateNutritionLog(log.id)}>Save</button>
                      ):(
                        <>
                        <button onClick={()=> handleEditNutritionLog(log)}>Edit</button>
                    <button onClick={() => deleteNutritionLog(log.id)}>Delete</button>
                        </>       
                      )}          
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