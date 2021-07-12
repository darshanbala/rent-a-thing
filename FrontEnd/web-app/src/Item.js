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
        rentalConfirmed: false,
        errorMessage: '',
        usersOwnItem: false,
    }

    state = this.initialState

    async componentDidMount() {
        this.props.cookieCheck();

        // Get id from the url
        const url = window.location.href
        const urlSplit = url.split('/')
        const id = urlSplit[urlSplit.length - 1]

        // Fetch API response
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/item/${id}`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        const { itemInArray, usersOwnItem } = await response.json()
        const item = itemInArray[0]

        // Set state
        this.setState({ item, usersOwnItem })
    }

    handleChange = (event) => {
        const { name, value } = event.target

        this.setState(prevState => ({
            fields: {
                ...prevState.fields,
                [name]: value,
            },
            errorMessage: '',
            rentalConfirmed: false,
        }))
    }

    submitForm = async () => {
        const itemId = this.state.item.id
        const { rentFrom, rentUntil } = this.state.fields

        if (!rentFrom || !rentUntil) {
            this.setState({ errorMessage: 'Please enter a valid rent from and rent until date' })
            return
        }
        
        if (rentFrom > rentUntil) {
            this.setState({ errorMessage: 'You cannot time travel (please set the return date to be later than the rental date)' })
        }

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
        const { errorMessage } = await response.json()

        if (errorMessage) {
            this.setState({ errorMessage })
        } else {
            this.setState({
                fields: this.initialState.fields,
                rentalConfirmed: true,
            })
        }

    }

    render() {
        const item = this.state.item
        const { rentFrom, rentUntil } = this.state.fields
        const errorMessage = this.state.errorMessage
        const rentalConfirmed = this.state.rentalConfirmed
        const usersOwnItem = this.state.usersOwnItem

        return (
            <div className='item-page-container'>
                <div className='item-page-image'>
                    <img src={item.img_url} alt={item.name} style={{ height: '500px' }} />
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
                        {!usersOwnItem &&
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
                            {errorMessage && <p>{ errorMessage }</p>}
                            {rentalConfirmed && <p>Item successfully rented</p>}
                        </form>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Item