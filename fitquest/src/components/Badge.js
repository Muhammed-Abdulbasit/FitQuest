import React from 'react';
import './Badge.css';

const Achievement = ({ name, description, color }) => {
    const hexagonStyle = {
        '--hexagon-color-dark': color.dark,
        '--hexagon-color-light': color.light
    };

    return (
        <div className="hexagon" style={hexagonStyle}>
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    );
};

export default Achievement;
