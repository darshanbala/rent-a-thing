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
        const response = await fetch('http://localhost:8080/items', {
            method: 'GET',
            credentials: 'include'
        })
        //respose is making the request
        const items = await response.json()
        //console.log(items.items)
        this.setState({ items })
        //console.log(this.state)
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
                <div className="item-list">
                    {items.items.map(({ id, name, is_available }) =>
                        <Card key={id} id={id} name={name} is_available={is_available}
                            handleItemClick={() => this.handleItemClick(id)}
                        />
                    )}
                </div>

            )
        }
    }

} export default Things;

