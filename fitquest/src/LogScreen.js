import { NavBar } from './components/NavBar';
import './LogScreen.css'

export function LogScreen() {
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
            <td><input type='text' name='workoutname'></input></td>
            <td>
            <select >
            <option>Select</option>
            <option>Strength</option>
            <option>Cardio</option>
            <option>Balance</option>
            <option>Flexibility</option>
            <option>Aerobic</option>
        </select>
            </td>
            <td><input type='number' name='workoutTime'></input></td>
            <td><input type='date' name='workoutDate'></input></td>
            <td><input type='submit' name='workoutSubmit' value={'Add New Row'}></input></td>
          </tbody>
          <tbody>
        {/* {workouts.map((workout, index) => (
          <tr key={index}>
            <td>{workout.name}</td>
            <td>{workout.type}</td>
            <td>{workout.duration}</td>
          </tr>
        ))} */}
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
            <td><input type='text' name='foodname'></input></td>
            <td><input type='number' name='foodCalorie'></input></td>
            <td><input type='number' name='foodCarb'></input></td>
            <td><input type='number' name='foodProtein'></input></td>
            <td><input type='date' name='foodDate'></input></td>
            <td><input type='submit' name='foodSubmit' value={'Add New Row'}></input></td>
          </tbody>
          <tbody>
        {/* {workouts.map((workout, index) => (
          <tr key={index}>
            <td>{workout.name}</td>
            <td>{workout.type}</td>
            <td>{workout.duration}</td>
          </tr>
        ))} */}
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