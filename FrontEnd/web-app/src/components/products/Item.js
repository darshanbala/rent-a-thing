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
        usersOwnItem: false,
        itemIsInEditMode: false,
        descriptionIsInEditMode: false,
        redirect: {
          clicked: false,
          user: null
        }
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
        console.log('User: '+usersOwnItem)
        const item = itemInArray[0]

        // Set state
        this.setState({ item, itemDuringChange: item, usersOwnItem })
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
            this.setState({
                itemIsInEditMode: !this.state.itemIsInEditMode,
            })
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
            this.setState({
                descriptionIsInEditMode: !this.state.descriptionIsInEditMode,
            })
        }
    }

    handleEditChange = (event) => {
        const { name, value } = event.target

        this.setState(prevState => ({
            itemDuringChange: {
                ...prevState.itemDuringChange,
                [name]: value,
            },
        }))
    }

    updateItemNameValue = async () => {
        const item = this.state.item
        const itemDuringChange = this.state.itemDuringChange

        this.setState({
            item: itemDuringChange,
            itemIsInEditMode: false,
        })

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
        const rentalConfirmed = this.state.rentalConfirmed
        const usersOwnItem = this.state.usersOwnItem
        const itemIsInEditMode = this.state.itemIsInEditMode
        const descriptionIsInEditMode = this.state.descriptionIsInEditMode
        const  redirectClicked  = this.state.redirect.clicked
        let redirectUser = null;
        if(redirectClicked){
           redirectUser  = this.state.redirect.user
        }

        console.log('redirect clicked: '+redirectUser)
        return (
          <>
          { redirectClicked &&
            <Redirect
            to={{
            pathname: "/visitingUser",
            state: { user: redirectUser, justVisiting: true }
            }}
            />
          }

            <div className='item-page-container'>
                <div className='item-page-image'>
                    <img src={item.img_url} alt={item.name} style={{ height: '500px' }} />
                </div>
                <div className='item-page-content-container'>
                    <div className="item-page-name">
                        {itemIsInEditMode ?
                            <h1>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={itemDuringChange.name}
                                    onChange={(e) => this.handleEditChange(e)}
                                />
                                <button onClick={this.changeEditModeItem}>X</button>
                                <button onClick={this.updateItemNameValue}>OK</button>
                            </h1> :
                            <h1 onDoubleClick={this.changeEditModeItem}>{item.name}</h1>}
                        <p>Offered by <span id='user_profile_link' onClick={() => this.goToUserProfile()}>{item.first_name} {item.last_name}</span></p>
                    </div>
                    <div className="item-page-info">
                        <h2>Description</h2>
                        {descriptionIsInEditMode ?
                            <p>
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    value={itemDuringChange.description}
                                    onChange={(e) => this.handleEditChange(e)}
                                />
                                <button onClick={this.changeEditModeDescription}>X</button>
                                <button onClick={this.updateItemDescriptionValue}>OK</button>
                            </p> :
                            <p onDoubleClick={this.changeEditModeDescription}>{item.description}</p>}
                    </div>
                    <div className="item-page-reviews">
                        <h2>Reviews</h2>
                    </div>
                    <div className="item-page-rent">
                        {!usersOwnItem &&
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
                                        {errorMessage && <p>{errorMessage}</p>}
                                        {rentalConfirmed && <p>Item successfully rented</p>}
                                    </form>
                                }
                                {!item.is_available &&
                                    <div>
                                        <span>This item is not currently available to be rented</span>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                    <div className="item-page-management">
                        {usersOwnItem &&
                            <div>
                                {item.is_available &&
                                    <div>
                                        <span>This item is available to be rented by others:</span>
                                        <button className="item-page-set-unavailable" onClick={this.changeItemAvailability}>Set unavailable</button>
                                    </div>
                                }
                                {!item.is_available &&
                                    <div>
                                        <span>This item is not set as available to be rented by others:</span>
                                        <button className="item-page-set-available" onClick={this.changeItemAvailability}>Set available</button>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                    {console.log(Boolean(this.props.user.id > 20 ))}
                    {this.props.user.id > 20 &&
                    <SendMessage ownerName={`${item.first_name}${item.owner_id}`} loggedInUser={`${this.props.user.first_name}${this.props.user.id}`} secret={this.props.user.email}/>
                    
                    
                    }
                    
                </div>
            </div>
            </>
        )
    }
}

export default Item
