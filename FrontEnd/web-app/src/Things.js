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
        const items  = this.props.items
        this.setState({ items })
       
    }

    handleItemClick(id) {
       console.log(id)

    }

    render() {
        const { items } = this.state
        //console.log(items)
        if (!items) {
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
