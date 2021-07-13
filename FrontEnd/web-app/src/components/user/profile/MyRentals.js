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

        if(await fromBackend.lending){
          this.setState({
              lending: fromBackend.lending
          })
        }
        if(await fromBackend.borrowing){
          this.setState({
              borrowing: fromBackend.borrowing
          })
        }
    }


    render() {
        let lending = this.state.lending
        let borrowing = this.state.borrowing
        
        return (

            <div className="my-rentals-container">
                <h2>Lending</h2>
                <div className="lending">
                    { lending &&
                    lending.map(({ id, name, rented_from, rented_until, trader_first_name, trader_last_name, img_url }) =>
                        <Card
                            key={id}
                            name={name}
                            rented_from={rented_from}
                            rented_until={rented_until}
                            img_url={img_url}
                            trader_first_name={trader_first_name}
                            trader_last_name={trader_last_name}
                            cardType='myrentals-page-card' />
                    )
                  } { !lending[0] &&
                      <p>No items lended out</p>
                  }
                </div>
                <h2>Borrowing</h2>
                <div className="borrowing">
                    { borrowing &&
                    borrowing.map(({ id, name, rented_from, rented_until, trader_first_name, trader_last_name, img_url }) =>
                        <Card
                            key={id}
                            name={name}
                            rented_from={rented_from}
                            rented_until={rented_until}
                            img_url={img_url}
                            trader_first_name={trader_first_name}
                            trader_last_name={trader_last_name}
                            cardType='myrentals-page-card' />
                    )
                  } { !borrowing[0] &&
                      <p>No items borrowed</p>
                  }
                </div>
            </div>
        )
    }

}

export default MyRentals;
