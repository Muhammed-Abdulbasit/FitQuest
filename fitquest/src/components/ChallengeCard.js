import './ChallengeCard.css'

const ChallengeCard = (props) => {
    return(
        <div className='challenge-card'>
            <img src ={props.img}></img>
            <h5>{props.title}</h5>
            <p>{props.desc}</p>
            <p>{props.xp}</p>
        </div>
    )
}

export default ChallengeCard;