import './WorkoutsCard.css'

const WorkoutCard = (props) => {
    return(
        <div className='workout-card'>
            <img src ={props.img}></img>
            <div className='left-side-workout-card'>
                <h3>{props.title}</h3>
                <p>{props.desc}</p>
            </div>
        </div>
    )
}

export default WorkoutCard;