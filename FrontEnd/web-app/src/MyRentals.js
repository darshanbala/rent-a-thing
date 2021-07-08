import React, { Component } from 'react';
import './MyRentals.css'

class MyRentals extends Component {

    


    render() {
        const borrowing = {
            itemName: "Xbox",
            pickUp: new Date('1 Jan 2021'),
            dropOff: new Date('7 Jan 2021'),
            lenderName: "Tom"
        }

        
        return (
            <div className="my-rentals-container">
                <div className="lending">
                    <h2>Lending</h2>
                </div>
                <div className="borrowing">
                    <h2>Borrowing</h2>
                </div>
            </div>
        )
    }

}

export default MyRentals;