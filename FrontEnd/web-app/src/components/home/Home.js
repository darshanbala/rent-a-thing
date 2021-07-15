import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../index.css';
import SearchBar from './SearchBar';
import ThingsHandler from '../framework/ThingsHandler';

class Home extends Component {

    state = {
        submissionConfirmed: false,
        searchCriteria: {}
    }

    constructor(props) {
        super(props);
        console.log("");
    }
/*
    async checkForUser(){
        let { user } = this.props;
        user = await this.props.checkWhoIsSignedIn();
        if(user){
            //console.log(user.user[0]);
            this.props.setUser(user.user[0]); // Set user as object of user data {...}
            await this.props.toggleLoggedIn(true);
        }else{
            this.props.setUser(null); // Or set user as null
            await this.props.toggleLoggedIn(false);
        }
    }
*/
    async componentDidMount() {
        this.props.cookieCheck();
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
        //console.log(arg);
        this.setState({ submissionConfirmed: true, searchCriteria: arg });
    }

    render() {
        const { submissionConfirmed, searchCriteria } = this.state;

        if (submissionConfirmed) {
            return (
                <section>
                    <SearchBar submitSearch={(arg) => this.submitSearch(arg)} />
                    <ThingsHandler searchCriteria={ searchCriteria } cookieCheck={this.props.cookieCheck}/>
                </section>
            );
        }
        else {
            return (
                <section>
                    <SearchBar submitSearch={(arg) => this.submitSearch(arg)} />
                    <main>
                        <h1>Welcome to Rent-A-Thing!</h1>
                        <h3>Where you can rent any thing our community of users has to offer.</h3>
                    </main>
                </section>
            );
        }
    }
}

export default Home;
