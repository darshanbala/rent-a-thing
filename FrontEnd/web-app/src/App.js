import React, { Component } from 'react';
import './index.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from 'react-router-dom';
import Home from './Home';
import CreateAccount from './CreateAccount';
import Login from './Login';
import Item from './Item'


class App extends Component {

    state = { isLoggedIn: false, user: '' };

    async checkWhoIsSignedIn() {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/checkWhoIsSignedIn`, { method: 'GET', credentials: 'include' });
        const user = await response.json();
        return user;
    }

    async toggleLoggedIn(arg) {
        if (arg) {
            this.setState(state => ({ ...state, isLoggedIn: true }));
        } else {
            this.setState(state => ({ ...state, isLoggedIn: false }));
        }
    }

    setUser(updatedUserValue) {
        this.setState(state => ({ ...state, user: updatedUserValue }));
    }


    render() {
        const { isLoggedIn, user } = this.state;

        return (

            <Router>
                <div className="header">
                    Rent A Thing
                </div>
                <nav className="navBar">
                    <NavLink className="navButton" to="/" activeClassName="active">Home</NavLink>
                    <NavLink className="navButton floatRight" to="/Login" activeClassName="active">Login</NavLink>
                    <NavLink className="navButton floatRight" to="/CreateAccount" activeClassName="active">Create Account</NavLink>
                </nav>
                <Switch>
                    <Route exact path="/">
                        <Home user={user} setUser={(arg) => this.setUser(arg)} toggleLoggedIn={(arg) => this.toggleLoggedIn(arg)} checkWhoIsSignedIn={() => this.checkWhoIsSignedIn()}></Home>
                    </Route>
                    <Route path="/CreateAccount">
                        <CreateAccount user={user} setUser={(arg) => this.setUser(arg)} toggleLoggedIn={(arg) => this.toggleLoggedIn(arg)} checkWhoIsSignedIn={() => this.checkWhoIsSignedIn()} />
                    </Route>
                    <Route path="/Login">
                        <Login user={user} setUser={(arg) => this.setUser(arg)} toggleLoggedIn={(arg) => this.toggleLoggedIn(arg)} checkWhoIsSignedIn={() => this.checkWhoIsSignedIn()}></Login>
                    </Route>
                    <Route path="/Item">
                        <Item />
                    </Route>
                </Switch>
                <div className="footer">
                  <p>Legal stuff | Contact Info | etc.</p>
                </div>
              </Router>

        );
    }
}

export default App;
