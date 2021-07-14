import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../index.css';
import '../../css/Things.css';
import Card from './Card';

class Things extends Component {

    state = {
        items: null
    }

    async componentDidMount() {
        const items = this.props.items
        //console.log("Items:")
        //console.log(items)
        this.setState({ items })

    }

    async componentDidUpdate(prevProps, prevState) {
      //console.log(this.props)
      if(prevProps !== this.props){

        if(!this.props.items[0]){
          this.setState({
            items: false
          })
        }
        this.setState({
          items: this.props.items
        })
      }
    }

    handleItemClick(id) {
        //console.log(id)

    }

    render() {
        //const { items } = this.state;
        const items = this.props.items;
        //console.log(items);
        //console.log("Items:")
        //console.log(items)
        if (!items) {
            return (<p>Loading....</p>)
        } else {

            return (
                <div className='item-list'>
                    {items.map(({ id, name, price, is_available, img_url }) =>
                        <Card key={id} id={id} name={name} price={price} is_available={is_available} img_url={img_url} cardType='things-page-card' />
                    )}
                </div>

            )
        }
    }

} export default Things;
