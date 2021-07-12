import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../index.css';

class PostItem extends Component {

    initialState = {
        name: '',
        description: '',
        category:'' ,
        age_restriction: '',
        owner_id : ''



    }

    state = this.initialState;

    resetForm() {
        this.setState(this.initialState);
    }





    async handleSubmit(e) {
        // const user = this.props.checkWhoIsSignedIn()


        const { name, description, category, age_restriction } = this.state;
        const ownerID = this.props.userID
        e.preventDefault();
        this.resetForm();
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/postItem`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, description, category, age_restriction, ownerID })
            }
        );
        //const test = await response.json();
        //console.log(test)
        //console.log(document.cookie)

    }


    render() {
        const { name, description, category, age_restriction } = this.state;



        return (

            <main>
            <h1 className="centered">Post Item</h1>
            <form className='SubmissionForm' onSubmit={(e) => this.handleSubmit(e)}>
            <label>Item Name <input type = 'text' name = 'name' value={name}
            onChange = {(e) => this.setState({name: e.target.value})}></input></label>
            <label>description <input type = 'text' name = 'description' value={description}
            onChange = {(e) => this.setState({description: e.target.value})}></input></label>




             <select name = "category" value={category} onChange = {(e) => this.setState({category: e.target.value})}>
                <option>Please Select Category</option>
                <option value="1">Landscape</option>
                <option value="2">Indoor</option>
                <option value="3">Sport</option>
                <option value="4">Gaming</option>

            </select>

            <select name = "category" value={age_restriction} onChange = {(e) => this.setState({age_restriction: e.target.value})}>
                <option>Please select Age restrction</option>
                <option value='0'>No restriction</option>
                <option value="18">18 and over</option>


            </select>




            <button type='submit'>PostItem</button>
                </form>
            </main>
        );
    }
}

export default PostItem;
