import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './index.css';

class Login extends Component {

    initialState = {
        email: '',
        password: '',
        touched: {
            email: false,
            password: false,
        },
        successfullySubmitted: false,
        //user: null
    }

    state = this.initialState;

    resetForm() {
        this.setState(this.initialState);
    }

    async componentDidMount() {
        //this.checkForUser();
    }

    markAsTouched(field) {
        const newTouched = { ...this.state.touched };
        newTouched[field] = true;
        this.setState({ touched: newTouched });
    }

    emailErrors() {
        const { email, touched } = this.state;
        if (!touched.email) return false;
        if (email.length < 10) return "Email is too short";
        if (email.length > 50) return "Email is too long";
    }

    passwordErrors() {
        const { password, touched } = this.state;
        if (!touched.password) return false;
        if (password.length < 8) return "Password is too short";
        if (password.length > 50) return "Password is too long";
    }

    async handleSubmit(e) {
        const { email, password } = this.state;
        e.preventDefault();
        this.resetForm();
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/login`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            }
        );
        const isSuccess = await response.json();
        if (isSuccess.code === 200) {
            //console.log(isSuccess.loggedInAs);
            //this.props.setSignedInUser(isSuccess.loggedInAs);
            this.props.cookieCheck()
            this.setState({ successfullySubmitted: true });
        }
    }
/*
    CHECKING THE COOKIE IS NOW DONE IN APP.js SO THAT IF A USER HAS A COOKIE
    THEY WILL AUTOMATICALLY BE LOGGED STRAIGHT IN NO MATTER WHAT PART OF THE SITE
    THEY GO TO

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

    render() {
        const { email, password, successfullySubmitted, touched } = this.state;
        if (successfullySubmitted) {
            //console.log("Sucessfully logged in and redirecting")
            return (<Redirect to="/"/>);
        }

        return (
            <main>
                <form className='SubmissionForm' onSubmit={(e) => this.handleSubmit(e)}>
                    <section>
                        <label>Email:
                            <input
                                value={email}
                                onChange={(e) => this.setState({ email: e.target.value })}
                                onBlur={() => this.markAsTouched('email')}
                                type='text'
                            />
                        </label>
                        {this.emailErrors() && <p className='error'>{this.emailErrors()}</p>}
                    </section>
                    <section>
                        <label>Password:
                            <input
                                value={password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                                onBlur={() => this.markAsTouched('password')}
                                type='text'
                            />
                        </label>
                        {this.passwordErrors() && <p className='error'>{this.passwordErrors()}</p>}
                    </section>
                    <button type='submit' disabled={!touched.email || !touched.password || this.emailErrors() || this.passwordErrors()} >Login</button>
                </form>
            </main>
        );
    }
}

export default Login;
