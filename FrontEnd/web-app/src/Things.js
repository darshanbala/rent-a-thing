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

   getID (id){
       console.log(id)

    }

    


    render() {
        const { items } = this.state

        // if (items.length !== 0) {
        //     const available = items.items[0].is_available
        //     console.log(available)
        // }

        // return(
        //     <h1>{JSON.stringify(items)}</h1>
        // )

        if (items.length === 0) {
            return (<p>Loading....</p>)
        } else {
            //console.log(items.items[0].is_available)
           

                console.log(items.items.map(items => items.is_available))

            
            return (
                <div className="item-list">
                    {items.items.map(({id, name, is_available }) =>
                        <Card key={id} name={name} is_available={is_available} 
                            handleItemClick = {() => this.getID(id) }
                        />
                    )}
                </div>
            )
        }
    }

} export default Things;

