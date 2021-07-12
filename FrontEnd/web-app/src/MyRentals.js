import React, { Component } from 'react';
import './MyRentals.css'
import Card from './Card'

class MyRentals extends Component {

    state = {
        lending: null,
        borrowing: null
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

      console.log(this.state,"this.state")

    }


    render() {
        const lending = this.state.lending
        const borrowing = this.state.borrowing

        return (
            <div className="my-rentals-container">
                <div className="lending">
                    <h2>Lending</h2>
                    {lending.map(({ id, name, is_available, img_url }) =>
                        <Card key={id} id={id} name={name} is_available={is_available} img_url={img_url} cardType='things-page-card'/>
                    )}
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