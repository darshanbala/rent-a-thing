import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../index.css';
import '../../css/categories.css';
import Category from './Category';
import ThingsHandler from '../framework/ThingsHandler.js'

class Categories extends Component {

    state = {
        categories: [],
        hasChosen: false,
        chosenValue: ''
    }

    async componentDidMount() {
        this.props.cookieCheck();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
            method: 'GET',
            credentials: 'include'
        })
        const categories = await response.json()
        this.setState({ categories })
    }

    handleClick(chosenValue) {
        console.log(chosenValue);
        //return (<Redirect to="/"/>);
        this.setState({chosenValue});
        this.setState({hasChosen: true});
    }

    render() {
        const { categories, hasChosen, chosenValue } = this.state

        if(hasChosen){
            //call parent method that goes to things with chosenValue
            return ( <ThingsHandler categoryId={ chosenValue } /> );
        }

        //console.log(categories);
        if (categories.length === 0) {
            return (<p>Loading....</p>)
        } else {
            //console.log(categories[0].imgurl);

            return (
                <div className='item-list'>
                    {categories.map(({ id, name, description, imgurl }) =>
                        <Category key={id} id={id} name={name} description={description} imgurl={imgurl} handleClick={(arg) => this.handleClick(arg)}/>
                    )}
                </div>

            )
        }
    }

} export default Categories;
