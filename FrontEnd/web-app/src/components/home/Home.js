import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../index.css';
import SearchBar from './SearchBar';
import ThingsHandler from '../framework/ThingsHandler';

class Home extends Component {

    state = {
        submissionConfirmed: false,
        searchCriteria: {
          category: null,
          searchingFor: false
        },
        onHomePage: false
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
        //this.props.cookieCheck();
        if(this.props.searchParams) {
          this.setState({searchCriteria: this.props.searchParams})
        }
        console.log(await this.props.onHomePage)
        if(this.props.onHomePage === true){
          this.setState({onHomePage: true})
        }
    }

    componentDidUpdate(PrevProps, PrevState) {
        console.log(""+JSON.stringify(this.props));
        if(PrevProps !== this.props){
          try{
            if(this.props.onHomePage === false && this.props.onHomePage !== undefined) {
              this.setState({onHomePage: false, searchCriteria: {category: this.props.categoryId} })
            }else{
              this.setState({ onHomePage: true })
            }
          }catch{
            this.setState({onHomePage: true})
          }
        }
    }

    componentWillUnmount() {
        console.log("");
        this.setState({onHomePage: ''})
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
        this.setState({ submissionConfirmed: true, searchCriteria: { searchingFor: arg } });
    }

    render() {
        const { submissionConfirmed, searchCriteria, onHomePage } = this.state;
        console.log(searchCriteria)
        if (submissionConfirmed || !onHomePage) {
            return (
                <section>
                    <SearchBar onHomePage={onHomePage} submitSearch={(arg) => this.submitSearch(arg)} />
                    <ThingsHandler searchCriteria={ searchCriteria } cookieCheck={this.props.cookieCheck}/>
                </section>
            );
        }
        else {
            return (
                <section>
                    <SearchBar submitSearch={(arg) => this.submitSearch(arg)} />
                    <section>
                        <h1 id='welcome_message'>Welcome to Rent-A-Thing!</h1>
                        <h3 id='welcome_message'>Where you can rent any thing our community of users has to offer.</h3>
                        <h3 id='welcome_message'>What's mine is yours.</h3>
                        <h3 id='handshake'>????</h3>
                        <p id='terms_and_conditions'>Terms and conditions apply...</p>
                        <br />
                        {/*<img src='https://www.europeancitiesmarketing.com/wp-assets/uploads/2016/06/Banner-Sharing-Economy.jpg' />*/}
                    </section>
                </section>
            );
        }
    }
}

export default Home;
