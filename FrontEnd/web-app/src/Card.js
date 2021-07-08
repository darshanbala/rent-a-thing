import React from 'react';
import { Link, Redirect, Switch } from 'react-router-dom';
import './Card.css';


export default function Card({ id, name, is_available, handleItemClick }) {

    return (

        <Link to={`/item/${id}`}>
            <div className="item-card" onClick={() => handleItemClick()}>
                <img src="logo192.png" alt={name} />
                <div className="container" >
                    <h4><b>{name}</b></h4>
                    <p>Availability: {is_available.toString()}</p>
                    <p>£19.99/day</p>
                </div>
            </div>
        </Link>

    )
}

