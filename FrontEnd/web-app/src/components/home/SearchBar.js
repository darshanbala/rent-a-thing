import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { format } from 'date-fns'
import '../../index.css';

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

    componentDidUpdate(PrevProps, PrevState) {
        if(this.state.item!== PrevState.item){
          //console.log(this.state)
          this.props.submitSearch(this.state)
        }

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
            <section>
                <form type="submit" className="searchBar">
                    <div>
                    <span><input type="text" name="item" id="item" value={item} onChange={(e) => this.handleChange(e)} placeholder='item' /></span>
                    <span><input type="date" name="dateFrom" id="dateFrom" value={dateFrom} min={format(new Date(), 'y-MM-d')} onChange={(e) => this.handleChange(e)} placeholder='dateFrom' /></span>
                    <span><input type="date" name="dateTo" id="dateTo" value={dateTo} min={format(new Date(), 'y-MM-d')} onChange={(e) => this.handleChange(e)} placeholder='dateTo' /></span>
                    <span><input type="text" name="location" id="location" value={location} onChange={(e) => this.handleChange(e)} placeholder='location' /></span>
                    </div>
                    <div>
                    <input id='search_submit' type='submit' onClick={(e) => this.formSubmission(e)} value='GO'/>
                    </div>
                </form>
            </section>
        );
    }
}

export default SearchBar;
