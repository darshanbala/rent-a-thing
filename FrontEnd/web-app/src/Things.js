import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './index.css';
import './Things.css'
import Card from './Card'

class Things extends Component {

    state = {
        items: []
    }

    async componentDidMount() {
        this.props.cookieCheck();
        
        const response = await fetch('http://localhost:8080/items', {
            method: 'GET',
            credentials: 'include'
        })
        //respose is making the request
        const items = await response.json()
        console.log(items)
        
        this.setState({ items })
       
    }

    handleItemClick(id) {
       console.log(id)

    }

    render() {
        const { items } = this.state

        if (items.length === 0) {
            return (<p>Loading....</p>)
        } else {

            return (
                <div className='item-list'>
                    {items.map(({ id, name, is_available, img_url }) =>
                        <Card key={id} id={id} name={name} is_available={is_available} img_url={img_url} cardType='things-page-card'/>
                    )}
                </div>

            )
        }
    }

} export default Things;
