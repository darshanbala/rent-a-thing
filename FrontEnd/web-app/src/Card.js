import React from 'react';
import './Card.css';


export default function Card({ name, is_available, handleItemClick }) {

    return (
        <div className="item-card" onClick={() => handleItemClick()}>
            <img src="logo192.png" alt={name} />
            <div className="container" >
                <h4><b>{name}</b></h4>
                <p>Availability: {is_available.toString()}</p>
                <p>£19.99/day</p>
            </div>
        </div>
    )

}

