import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const checkCardType = ['things-page-card', 'myrentals-page-card']


export default function Card({ id, name, is_available, cardType, img_url }) {

    // Checks to see if card is valid
    const isValidCardType = checkCardType.includes(cardType)

    if (isValidCardType && cardType === 'things-page-card') {

        return (
            <Link to={`/item/${id}`}>
                <div className={cardType} >

                    <img className={`${cardType}-img`} src={!img_url ? "logo192.png" : img_url} alt={name} style={{ height: '192px' }} />

                    <div className={`${cardType}-text-container`}>
                        <h4><b>{name}</b></h4>
                        <p>Availability: {is_available.toString()}</p>
                        <p>£19.99/day</p>
                    </div>
                </div>
            </Link>

        )

    } else if (isValidCardType && cardType === 'myrentals-page-card') {

        return (
            <div className={cardType} >
                <img src="logo192.png" alt={name} />
                <div className={`${cardType}-container`}>
                    <h4><b>{name}</b></h4>
                    <p>pickUp</p>
                    <p>dropOff</p>
                    <p>lenderName</p>
                    <p>£19.99/day</p>
                </div>
            </div>


        )
    }
}

