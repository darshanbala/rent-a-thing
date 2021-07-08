import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './index.css'
import './Item.css'

class Item extends Component {

    async componentDidMount() {
        this.props.cookieCheck();
    }

    render() {
        return (
            <div className='item-page-container'>
                <div className='item-page-image'>
                    <img src="https://www.radmoretucker.co.uk/wp-content/uploads/2018/01/Husqvarna-435-Mark-II-Petrol-Chainsaw-15-600x600.jpg"></img>
                </div>
                <div className='item-page-content-container'>
                    <div className="item-page-name">
                        <h1>Name of item</h1>
                    </div>
                    <div className="item-page-info">
                        <h2>Information</h2>
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
                                    id="rentFrom" />
                            </span>
                            <span className="item-page-form-field">
                                <label htmlFor="rentUntil">Rent until: </label>
                                <input
                                    type="date"
                                    name="rentUntil"
                                    id="rentUntil" />
                            </span>
                            <input className="item-page-rent-button item-page-form-field" type="button" value="Rent item" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Item