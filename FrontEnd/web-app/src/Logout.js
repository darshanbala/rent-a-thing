import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './index.css';

class Logout extends Component {

    initialState = { successfullyLoggedOut: false }

    state = this.initialState;

    async componentDidMount() {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/logout`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );
        const isLoggedOut = await response.json();
        if (isLoggedOut) {
            this.setState({ successfullyLoggedOut: true });
        }
    }

    render() {
        const { successfullyLoggedOut } = this.state;
        if(successfullyLoggedOut){
            return (<Redirect to="/"/>);
        }
        return (
            <main>
                Logging out...
            </main>
        );
    }
}

export default Logout;
