import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './index.css';
import SearchBar from './SearchBar';
import Things from './Things';

class Home extends Component {

    state = {
        submissionConfirmed: false,
        searchCriteria: {}
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
    /*
    formSubmission(event) {
        event.preventDefault();
        console.log(this.state);
        this.setState({ submissionConfirmed: true });
        //this
        //const response = await fetch(.../thing);
        //const data = await response.jsonStringify();
        //if(data === 200){
        //    redirect to things 
        //} else {
        //    redirect to error page
        //}
    }
*/
    submitSearch(arg) {
        console.log(arg);
        this.setState({ submissionConfirmed: true, searchCriteria: arg });


    }

    render() {
        const { submissionConfirmed, searchCriteria } = this.state;

        if (submissionConfirmed) {
            return (
                <>
                    <SearchBar submitSearch={(arg) => this.submitSearch(arg)} />
                    <Things searchCriteria={searchCriteria} />
                </>
            );
        }
        else {
            return (
                <SearchBar submitSearch={(arg) => this.submitSearch(arg)} />
            );
        }
    }
}

export default Home;