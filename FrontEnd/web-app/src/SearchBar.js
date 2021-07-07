import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './index.css';

class SearchBar extends Component {

    state = {
        item: '',
        dateFrom: '',
        dateTo: '',
        location: ''
    }

    constructor(props) {
        super(props);
        console.log("");
    }

    componentDidMount() {
        console.log("");
    }

    componentDidUpdate() {
        console.log("");
    }

    componentWillUnmount() {
        console.log("");
    }

    changesState() {

    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value,
        })
    }

    formSubmission(event) {
        event.preventDefault();
        this.props.submitSearch(this.state);
    }

    render() {
        const { item, dateFrom, dateTo, location } = this.state;
        return (
            <main>
                <h1></h1>
                <form type="submit" className="searchBar">
                    <span><input type="text" name="item" id="item" value={item} onChange={(e) => this.handleChange(e)} placeholder='item' /></span>
                    <span><input type="date" name="dateFrom" id="dateFrom" value={dateFrom} onChange={(e) => this.handleChange(e)} placeholder='dateFrom' /></span>
                    <span><input type="date" name="dateTo" id="dateTo" value={dateTo} onChange={(e) => this.handleChange(e)} placeholder='dateTo' /></span>
                    <span><input type="text" name="location" id="location" value={location} onChange={(e) => this.handleChange(e)} placeholder='location' /></span>
                    <span><button onClick={(e) => this.formSubmission(e)} >Click Me!</button></span>
                </form>
            </main>
        );
    }
}

export default SearchBar;