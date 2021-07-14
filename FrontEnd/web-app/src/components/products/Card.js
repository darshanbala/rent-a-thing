import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'
import '../../css/Card.css';

const checkCardType = ['things-page-card', 'myrentals-page-card']


export default function Card({
    id,
    name,
    price,
    is_available,
    cardType,
    img_url,
    rented_from,
    rented_until,
    trader_first_name,
    trader_last_name,
}) {
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
                        <p>Price: £{price}</p>
                    </div>
                </div>
            </Link>

        )

    } else if (isValidCardType && cardType === 'myrentals-page-card') {

        return (
            <div className={cardType} >
                <img src={!img_url ? "logo192.png" : img_url} alt={name} class='rentals-page-card-img'/>
                <div className={`${cardType}-container`}>
                    <h4><b>{name}</b></h4>
                    <p>Pick up date: {format(new Date(rented_from), 'E dd MMMM, y')}</p>
                    <p>Drop off date: {format(new Date(rented_until), 'E dd MMMM, y')}</p>
                    <p>You're dealing with: {trader_first_name} {trader_last_name}</p>
                    <p>Price: £{price}</p>
                </div>
            </div>
        )
    }
}
