import React, { useState } from 'react';
import './ChallengeCard.css';

const ChallengeCard = (props) => {
    // State to track whether the challenge is completed
    const [completed, setCompleted] = useState(false);

    // Function to handle completion of the challenge
    const handleComplete = () => {
        // Toggle the completion status
        setCompleted(!completed);
    };

    // Determine the class name based on completion status
    const cardClassName = `challenge-card ${completed ? 'completed' : ''}`;

    return (
        <div className={cardClassName} onClick={handleComplete}>
            <img src={props.img} alt="Challenge" />
            <h5>{props.title}</h5>
            <p>{props.desc}</p>
            <p>{props.xp}</p>
        </div>
    );
}

export default ChallengeCard;
