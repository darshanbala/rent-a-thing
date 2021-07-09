import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './index.css';
import './Things.css';
import Card from './Card';

class Things extends Component {

    state = {
        items: null
    }

    async componentDidMount() {
        //this.props.cookieCheck();
        /*
        const response = await fetch('http://localhost:8080/items', {
            method: 'GET',
            credentials: 'include'
        })
        //respose is making the request
        const items = await response.json()
        //console.log(items.items)
        */
        const items  = this.props.items
        this.setState({ items })
        //console.log(this.state)
    }

    handleItemClick(id) {
       console.log(id)

    }

    render() {
        const { items } = this.state
        console.log(items)
        if (!items) {
            return (<p>Loading....</p>)
        } else {

            return (
                <div className='item-list'>
                    {items.map(({ id, name, is_available }) =>
                        <Card key={id} id={id} name={name} is_available={is_available} cardType='things-page-card'/>
                    )}
                </div>

            )
        }
    }

} export default Things;
