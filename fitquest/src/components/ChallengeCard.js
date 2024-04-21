import './ChallengeCard.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ChallengeCard = (props) => {
    const [userId, setUserId] = useState('');
    const [isClickable, setIsClickable] = useState(true);
    const [hasClicked, setHasClicked] = useState(false); // State to track if the card has been clicked

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.id);
        }
    }, []);

    const handleChallengeClick = () => {
        if (hasClicked) {
            return; // Don't proceed if the card has already been clicked
        }

        setIsClickable(false);
        setHasClicked(true); // Update state to indicate the card has been clicked

        axios.put(`http://localhost:8000/updateUserXP/${userId}/${props.xp}`)
            .then(response => {
                console.log('User XP updated successfully');
            })
            .catch(error => {
                console.error('Error updating user XP:', error);
            });
    };

    return (
        <div className={`challenge-card ${isClickable ? '' : 'disabled'}`} onClick={handleChallengeClick}>
            <img src={props.img} alt='Cartoon Here' />
            <h5>{props.title}</h5>
            <p>{props.desc}</p>
            <p>{props.xp} xp</p>
        </div>
    );
};

export default ChallengeCard;
