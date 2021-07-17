import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../index.css';
import ImageUpload from '../framework/ImageUpload';


class PostItem extends Component {

    initialState = {
        name: '',
        nameCharacterLimit: 35,
        description: '',
        descriptionCharacterLimit: 100,
        categories: null,
        price: null,
        category: null,
        age_restriction: null,
        owner_id: null,
        img_url: '',
        previous_submit_successful: false,
    }

    state = this.initialState;

    async componentDidMount() {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
            method: 'GET',
            credentials: 'include'
        })
        const categories = await response.json()
        this.setState({ categories })
    }

    resetForm() {
        this.setState(this.initialState);
    }


    handleImgUrl = (url) => {
        //console.log(url,'Url on PostItem')
        this.setState({ img_url: url })
    }

    handleChange = (e) => {
        console.log('HANDLE CHANGE FUNCTION')

        const { name, value } = e.target
        if (name === 'name') {
            this.setState({ name: value })
        } else if (name === 'description') {
            this.setState({ description: value })
        } else if (name === 'category') {
            this.setState({ category: parseInt(value, 10) })
        } else if (name === 'age_restriction') {
            this.setState({ age_restriction: parseInt(value, 10) })
        } else if (name === 'price') {
            let price = parseFloat(value).toFixed(2);
            price = parseFloat(price)
            this.setState({ price })
            //console.log(this.state.price)
        }
    }


    async handleSubmit(e) {
        //console.log('Submitting on PostItem.js')
        e.preventDefault();
        this.resetForm();

        const { name, description, price, category, age_restriction, img_url } = this.state;
        const ownerID = this.props.user.id
        const cityId = this.props.user.city_id
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/postItem`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, description, price, category, age_restriction, ownerID, img_url, cityId })
            }
        );

        const fromBackend = await response.json()
        console.log(fromBackend, 'fromBackend')

        if (fromBackend.submitted) {
            this.setState({ previous_submit_successful: true })
            // Can use this to add a green tick to page or something..
        }

        console.log(this.state.previous_submit_successful)

        //const test = await response.json();
        //console.log(test)
        //console.log(document.cookie)

    }

    allFieldsEntered = () => {
        const { name, description, price, category, age_restriction, img_url } = this.state;

        const buttonDisabled = !name || !description || !price || !category || !age_restriction || !img_url

        return !buttonDisabled
    }

    validateLive(info) {
        const { name, nameCharacterLimit, description, descriptionCharacterLimit } = this.state;

        const descriptionCharacterAlert = descriptionCharacterLimit - 10
        const nameRemainingCharactersAlert = nameCharacterLimit - 5

        if (info === name && name.length > nameRemainingCharactersAlert) {
            const countDown = nameCharacterLimit - name.length
            if (countDown === 0) {
                return;
            } else {
                return (<p className="error errorItemTitle">Remaining characters: {countDown}/{nameCharacterLimit}</p>)
            }
        } else if (info === description && description.length > descriptionCharacterAlert) {
            const countDown = descriptionCharacterLimit - description.length
            if (countDown === 0) {
                return;
            } else {
                return (<p className="error errorItemDescription">Remaining characters: {countDown}/{descriptionCharacterLimit}</p>)
            }
        }
    }


    render() {
        const { name, nameCharacterLimit, description, descriptionCharacterLimit, price, category, age_restriction, categories, img_url, previous_submit_successful } = this.state;


        return (
            <>
                <h1 className="centered">Post an advert for an item to be made available for rental</h1>

                <div className="PostItems-container">

                    <div className="PostItemsImage-container">
                        <ImageUpload img_url={img_url} handleImgUrl={this.handleImgUrl} />
                    </div>

                    <div className="PostItemsDetails-container">
                        <form className='SubmissionForm SubmissionFormPostItem' onSubmit={(e) => this.handleSubmit(e)}>
                            <section>

                                <label>Title </label>
                                <input type='text' name='name' placeholder="What are you lending?" value={name} maxlength={nameCharacterLimit} onChange={this.handleChange} />
                                <div>{this.validateLive(name)}</div>

                            </section>

                            <section>
                                <label>Description </label>
                                <input type='text' name='description' placeholder="Accurately describe your item in a few words" value={description} maxlength={descriptionCharacterLimit} onChange={this.handleChange}></input>
                                <div>{this.validateLive(description)}</div>
                            </section>


                            <section>
                                <label> Price: </label>
                                <input type="number" name='price' placeholder="£ / day" value={price} onChange={this.handleChange} step="0.01" min="0" />
                            </section>


                            {categories &&
                                <section>
                                    <label>Category </label>
                                    <select name="category" value={category} onChange={this.handleChange}>
                                        <option>Please select a category</option>
                                        {categories.map(({ id, name, description, imgurl }) =>
                                            <option key={id} id={id} name={category} value={id}>{name}</option>
                                        )}
                                    </select>
                                </section>
                            }

                            <section>
                                <label>Age restriction</label>
                                <select name="age_restriction" value={age_restriction} onChange={this.handleChange}>
                                    <option>Please select an age restriction</option>
                                    <option value='1'>No restriction</option>
                                    <option value="18">18 and over</option>
                                </select>
                            </section>

                            <input disabled={!this.allFieldsEntered()} type='submit' value='Post item' />
                        </form>

                        {previous_submit_successful && <Redirect to="/page" />}
                    </div>
                </div>

            </>

        );
    }



} export default PostItem;
