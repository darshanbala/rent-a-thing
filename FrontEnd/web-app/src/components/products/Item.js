import React, { Component, useReducer } from 'react'
import { Redirect } from 'react-router-dom';
import { format } from 'date-fns'
import '../../index.css'
import '../../css/Item.css'
import SendMessage from './SendMessage';

class Item extends Component {

    initialState = {
        item: [],
        itemDuringChange: [],
        fields: {
            rentFrom: '',
            rentUntil: '',
        },
        rentalConfirmed: false,
        errorMessage: '',
        errorMessageEditName: '',
        errorMessageEditDescription: '',
        usersOwnItem: false,
        itemIsInEditMode: false,
        descriptionIsInEditMode: false,
        redirect: {
            clicked: false,
            user: null
        },
        itemWasFound: true,
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

        if (itemInArray.length === 0) {
            this.setState({ itemWasFound: false })
        } else {
            const item = itemInArray[0]
            this.setState({ item, itemDuringChange: item, usersOwnItem })
        }
    }

    // Functions relating to the rental form

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

    // Functions relating to editing a user's own item

    changeEditModeItem = () => {
        const usersOwnItem = this.state.usersOwnItem

        // Can only edit your own item
        if (!usersOwnItem) {
            this.setState({
                itemIsInEditMode: false,
            })
        } else {
            this.setState(prevState => ({
                itemDuringChange: {
                    ...prevState.itemDuringChange,
                    name: this.state.item.name,
                },
                itemIsInEditMode: !this.state.itemIsInEditMode,
                errorMessageEditName: '',
            }))
        }
    }

    changeEditModeDescription = () => {
        const usersOwnItem = this.state.usersOwnItem

        // Can only edit your own item
        if (!usersOwnItem) {
            this.setState({
                descriptionIsInEditMode: false,
            })
        } else {
            this.setState(prevState => ({
                itemDuringChange: {
                    ...prevState.itemDuringChange,
                    description: this.state.item.description,
                },
                descriptionIsInEditMode: !this.state.descriptionIsInEditMode,
                errorMessageEditDescription: '',
            }))
        }
    }

    handleEditChangeName = (event) => {
        const { name, value } = event.target

        this.setState(prevState => ({
            itemDuringChange: {
                ...prevState.itemDuringChange,
                [name]: value,
            },
            errorMessageEditName: '',
        }))
    }

    handleEditChangeDescription = (event) => {
        const { name, value } = event.target

        this.setState(prevState => ({
            itemDuringChange: {
                ...prevState.itemDuringChange,
                [name]: value,
            },
            errorMessageEditDescription: '',
        }))
    }

    updateItemNameValue = async () => {
        const item = this.state.item
        const itemDuringChange = this.state.itemDuringChange

        if (itemDuringChange.name === '') {
            this.setState({
                errorMessageEditName: 'Item name cannot be blank'
            })
            return
        } else {
            this.setState({
                item: itemDuringChange,
                itemIsInEditMode: false,
            })
        }

        const itemId = item.id
        const ownerId = item.owner_id
        const changedValue = itemDuringChange.name

        await fetch(
            `${process.env.REACT_APP_API_URL}/editItemName`,
            {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemId, ownerId, changedValue })
            }
        )
    }

    updateItemDescriptionValue = async () => {
        const item = this.state.item
        const itemDuringChange = this.state.itemDuringChange

        if (itemDuringChange.description === '') {
            this.setState({
                errorMessageEditDescription: 'Item description cannot be blank'
            })
            return
        } else {
            this.setState({
                item: itemDuringChange,
                itemIsInEditMode: false,
            })
        }

        this.setState({
            item: itemDuringChange,
            descriptionIsInEditMode: false,
        })

        const itemId = item.id
        const ownerId = item.owner_id
        const changedValue = itemDuringChange.description

        await fetch(
            `${process.env.REACT_APP_API_URL}/editItemDescription`,
            {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemId, ownerId, changedValue })
            }
        )
    }

    changeItemAvailability = async () => {
        const item = this.state.item
        const itemId = item.id
        const ownerId = item.owner_id
        const isAvailable = !item.is_available

        this.setState(prevState => ({
            item: {
                ...prevState.item,
                is_available: isAvailable,
            },
        }))

        await fetch(
            `${process.env.REACT_APP_API_URL}/changeItemAvailability`,
            {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemId, ownerId, isAvailable })
            }
        )
    }

    async goToUserProfile() {
        const { item } = this.state
        const user_id = item.owner_id
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/visitAnotherProfile`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: user_id })
            }
        )
        const user = await response.json()
        this.setState({
            redirect: {
                clicked: true,
                user: user
            }
        })
    }

 

    render() {
        //console.log(this.props)
        const item = this.state.item
        const itemDuringChange = this.state.itemDuringChange
        const { rentFrom, rentUntil } = this.state.fields
        const errorMessage = this.state.errorMessage
        const errorMessageEditName = this.state.errorMessageEditName
        const errorMessageEditDescription = this.state.errorMessageEditDescription
        const rentalConfirmed = this.state.rentalConfirmed
        const usersOwnItem = this.state.usersOwnItem
        const itemIsInEditMode = this.state.itemIsInEditMode
        const descriptionIsInEditMode = this.state.descriptionIsInEditMode
        const redirectClicked = this.state.redirect.clicked
        const itemWasFound = this.state.itemWasFound
        let redirectUser = null;
        if (redirectClicked) {
            redirectUser = this.state.redirect.user
        }

        console.log('redirect clicked: ' + redirectUser)
        return (
            <>
                {!itemWasFound && <h1>Error 404: Item was not found</h1>}


                {redirectClicked &&
                    <Redirect
                        to={{
                            pathname: "/visitingUser",
                            state: { user: redirectUser, justVisiting: true }
                        }}
                    />
                }

                {itemWasFound &&
                    <div className='item-page-container'>
                        <div className='item-page-image'>
                            <img src={item.img_url} alt={item.name} />
                        </div>
                        <div className='item-page-content-container'>
                            <div className="item-page-name">
                                {itemIsInEditMode ?
                                    <h1>
                                        <input
                                            className="edit-box"
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={itemDuringChange.name}
                                            onChange={(e) => this.handleEditChangeName(e)}
                                        />
                                        <button className="cancel-edit" onClick={this.changeEditModeItem}>X</button>
                                        <button className="confirm-edit" onClick={this.updateItemNameValue}>OK</button>
                                    </h1> :
                                    <h1>{item.name} <button className="edit-button" onClick={this.changeEditModeItem}>Edit</button></h1>}
                                {errorMessageEditName && <p className="item-page-error">{errorMessageEditName}</p>}
                                <p>Offered by <span id='user_profile_link' onClick={() => this.goToUserProfile()}>{item.first_name} {item.last_name}</span></p>
                            </div>
                            {!usersOwnItem &&
                                <div className="item-page-rent">
                                    <div>
                                        {item.is_available &&
                                            <form>
                                                <span className="item-page-form-field">
                                                    <label htmlFor="rentFrom">Rent from: </label>
                                                    <input
                                                        type="date"
                                                        name="rentFrom"
                                                        id="rentFrom"
                                                        value={rentFrom}
                                                        min={format(new Date(), 'y-MM-d')}
                                                        onChange={(e) => this.handleChange(e)} />
                                                </span>
                                                <span className="item-page-form-field">
                                                    <label htmlFor="rentUntil">Rent until: </label>
                                                    <input
                                                        type="date"
                                                        name="rentUntil"
                                                        id="rentUntil"
                                                        value={rentUntil}
                                                        min={format(new Date(), 'y-MM-d')}
                                                        onChange={(e) => this.handleChange(e)} />
                                                </span>
                                                <input
                                                    className="item-page-rent-button item-page-form-field"
                                                    type="button"
                                                    value="Rent item"
                                                    onClick={this.submitForm} />
                                                <br />
                                                {errorMessage && <p className="item-page-error">{errorMessage}</p>}
                                                {rentalConfirmed && <p>Item successfully rented</p>}
                                            </form>
                                        }
                                        {!item.is_available &&
                                            <div>
                                                <span>This item is not currently available to be rented</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                            {usersOwnItem &&
                                <div className="item-page-management">
                                    <div>
                                        {item.is_available &&
                                            <button className="item-page-set-unavailable" onClick={this.changeItemAvailability}>Available for rental</button>

                                        }
                                        {!item.is_available &&
                                            <button className="item-page-set-available" onClick={this.changeItemAvailability}>Unavailable for rental</button>
                                        }
                                    </div>
                                </div>
                            }
                            <div className="item-page-info">
                                <h2>Description</h2>
                                {descriptionIsInEditMode ?
                                    <p>
                                        <textarea
                                            className="edit-box"
                                            type="text"
                                            name="description"
                                            id="description"
                                            rows="5"
                                            value={itemDuringChange.description}
                                            onChange={(e) => this.handleEditChangeDescription(e)}
                                        />
                                        <button className="cancel-edit" onClick={this.changeEditModeDescription}>X</button>
                                        <button className="confirm-edit" onClick={this.updateItemDescriptionValue}>OK</button>
                                    </p> :
                                    <p>{item.description} <button className="edit-button" onClick={this.changeEditModeDescription}>Edit</button></p>}
                                {errorMessageEditDescription && <p className="item-page-error">{errorMessageEditDescription}</p>}
                            </div>
                            <div className="item-page-reviews">
                                <h2>Reviews</h2>
                            </div>
                        </div>
                    </div>
                    {console.log(Boolean(this.props.user.id > 20 ))}
                    {item.owner_id> 40 &&
                    <SendMessage ownerName={`${item.first_name}${item.owner_id}`} loggedInUser={`${this.props.user.first_name}${this.props.user.id}`} secret={this.props.user.email}/>
                    
                    
                    }
                    
                </div>
            </div>
            </>
        )
    }
}

export default Item
