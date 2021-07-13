import React, { Component } from 'react';
import '../../../css/MyRentals.css'
import Card from '../../products/Card'

class MyRentals extends Component {

    state = {
        lending: [],
        borrowing: []
    }


    //FETCH DATA FROM DATABASE FOR EACH USER
    // ASSIGN IN TO A STATE
    async componentDidMount() {

        const response = await fetch('http://localhost:8080/myrentals', {
            method: 'GET',
            credentials: 'include'
        })

        const fromBackend = await response.json()

        this.setState({
            lending: fromBackend.lending,
            borrowing: fromBackend.borrowing
        })

    }


    render() {
        const lending = this.state.lending
        const borrowing = this.state.borrowing

        return (
            <div className="my-rentals-container">
                <div className="lending">
                    <h2>Lending</h2>
                    {lending.length > 0 ? lending.map(({ id, name, rented_from, rented_until, trader_first_name, trader_last_name, img_url }) =>
                        <Card
                            key={id}
                            name={name}
                            rented_from={rented_from}
                            rented_until={rented_until}
                            img_url={img_url}
                            trader_first_name={trader_first_name}
                            trader_last_name={trader_last_name}
                            cardType='myrentals-page-card' />
                    ) : `Any items you lend out will appear here`}
                </div>
                <div className="borrowing">
                    <h2>Borrowing</h2>
                    {borrowing.length > 0 ? borrowing.map(({ id, name, rented_from, rented_until, trader_first_name, trader_last_name, img_url }) =>
                        <Card
                            key={id}
                            name={name}
                            rented_from={rented_from}
                            rented_until={rented_until}
                            img_url={img_url}
                            trader_first_name={trader_first_name}
                            trader_last_name={trader_last_name}
                            cardType='myrentals-page-card' />
                    ) : `Any items you borrow will appear here`}
                </div>
            </div>
        )
    }

}

export default MyRentals;
