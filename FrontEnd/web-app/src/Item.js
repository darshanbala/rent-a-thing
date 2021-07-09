import React, { Component, useReducer } from 'react'
import { Redirect } from 'react-router-dom'
import './index.css'
import './Item.css'

class Item extends Component {

    initialState = {
        item: [],
        fields: {
            rentFrom: '',
            rentUntil: '',
        },
        validDateRange: true,
        rentalConfirmed: false,
    }

    state = this.initialState

    async componentDidMount() {
        this.props.cookieCheck();

        // Get id from the url
        const url = window.location.href
        const urlSplit = url.split('/')
        const id = urlSplit[urlSplit.length - 1]

        // Fetch API response
        const response = await fetch(`${process.env.REACT_APP_API_URL}/item/${id}`)
        const [item] = await response.json()

        // Set state
        this.setState({ item })
    }

    handleChange = (event) => {
        const { name, value } = event.target

        this.setState(prevState => ({
            fields: {
                ...prevState.fields,
                [name]: value,
            },
            validDateRange: true,
            rentalConfirmed: false,
        }))
    }

    submitForm = async () => {
        const itemId = this.state.item.id
        const { rentFrom, rentUntil } = this.state.fields

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/rentItem`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemId, rentFrom, rentUntil })
            }
        )
        const rentalSubmitted = await response.json()

        if (!rentalSubmitted) {
            // TODO: Handle unsuccessful rental submission
            this.setState({ validDateRange: false })
        }
        else {
            // TODO: Handle successful rental submission
            this.setState({
                fields: this.initialState.fields,
                rentalConfirmed: true,
            })
        }

    }

    render() {
        const item = this.state.item
        const { rentFrom, rentUntil } = this.state.fields
        const validDateRange = this.state.validDateRange
        const rentalConfirmed = this.state.rentalConfirmed

        return (
            <div className='item-page-container'>
                <div className='item-page-image'>
                    <img src="https://www.radmoretucker.co.uk/wp-content/uploads/2018/01/Husqvarna-435-Mark-II-Petrol-Chainsaw-15-600x600.jpg" />
                </div>
                <div className='item-page-content-container'>
                    <div className="item-page-name">
                        <h1>{item.name}</h1>
                        <p>Offered by {item.first_name} {item.last_name}</p>
                    </div>
                    <div className="item-page-info">
                        <h2>Description</h2>
                        <p>{item.description}</p>
                    </div>
                    <div className="item-page-reviews">
                        <h2>Reviews</h2>
                    </div>
                    <div className="item-page-rent">
                        <form>
                            <span className="item-page-form-field">
                                <label htmlFor="rentFrom">Rent from: </label>
                                <input
                                    type="date"
                                    name="rentFrom"
                                    id="rentFrom"
                                    value={rentFrom}
                                    onChange={(e) => this.handleChange(e)} />
                            </span>
                            <span className="item-page-form-field">
                                <label htmlFor="rentUntil">Rent until: </label>
                                <input
                                    type="date"
                                    name="rentUntil"
                                    id="rentUntil"
                                    value={rentUntil}
                                    onChange={(e) => this.handleChange(e)} />
                            </span>
                            <input
                                className="item-page-rent-button item-page-form-field"
                                type="button"
                                value="Rent item"
                                onClick={this.submitForm} />
                            <br />
                            {!validDateRange && <p>Item is not available during this date range</p>}
                            {rentalConfirmed && <p>Item successfully rented</p>}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Item