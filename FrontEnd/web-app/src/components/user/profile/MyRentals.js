import React, { Component } from 'react';
import '../../../css/MyRentals.css'
import Card from '../../products/Card'

class MyRentals extends Component {


    render() {
        const borrowing = {
            name: "Xbox",
            pickUp: new Date('1 Jan 2021'),
            dropOff: new Date('7 Jan 2021'),
            lenderName: "Tom"
        }


        return (
            <div className="my-rentals-container">
                <div className="lending">
                    <h2>Lending</h2>
                    <Card
                        cardType='myrentals-page-card'
                        name="Lending"
                    />
                    <Card
                        cardType='myrentals-page-card'
                        name="Lending"
                    />
                    <Card
                        cardType='myrentals-page-card'
                        name="Lending"
                    />
                </div>
                <div className="borrowing">
                    <h2>Borrowing</h2>
                    <Card
                        cardType='myrentals-page-card'
                        name="Borrowing"
                    />
                    <Card
                        cardType='myrentals-page-card'
                        name="Borrowing"
                    />
                    <Card
                        cardType='myrentals-page-card'
                        name="Borrowing"
                    />
                    <Card
                        cardType='myrentals-page-card'
                        name="Borrowing"
                    />
                    <Card
                        cardType='myrentals-page-card'
                        name="Borrowing"
                    />
                </div>
            </div>
        )
    }

}

export default MyRentals;
