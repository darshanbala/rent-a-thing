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
        const response = await fetch('http://localhost:8080/items')
        //respose is making the request
        const items = await response.json()
        //this.setState({items})
        console.log(items)
    }




    render() {
        return (
            <>
                {/* <h1>{JSON.stringify(this.props.searchCriteria)}</h1> */}
                <div className="item-list">
                    <Card name="Hammer" isAvailable="Yes"/>
                    <Card name="Lawn Mower" isAvailable="No"/>
                    <Card name="Hammer" isAvailable="Yes"/>
                    <Card name="Lawn Mower" isAvailable="No"/>
                </div>
            </>
        );
    }
}

export default Things;



