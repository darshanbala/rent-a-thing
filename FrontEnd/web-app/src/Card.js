import React from 'react';
import './Card.css';


function Card({ name, isAvailable }) {

    console.log(isAvailable, 'Card Component - isAvailable')

    return (
        <div className="item-card">
            <img src="logo192.png" alt={name} />
            <div className="container">
                <h4><b>{name}</b></h4>
                <p>Availability: {isAvailable}</p>
                {/* { isAvailable && <p>available: {isAvailable.toString()}</p>} */}
                <p>£19.99/day</p>
            </div>
        </div>
    )

}

export default Card;