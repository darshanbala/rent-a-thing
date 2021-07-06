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


class App extends Component {

    render() {
        return (
            <Router>
                <div className="header">
                    News Site
                </div>
                <nav className="navBar">
                    <NavLink className="navButton" to="/">Home</NavLink>
                    <NavLink className="navButton" to="/CreateAccount">Create Account</NavLink>
                    <NavLink className="navButton" to="/Login">Login</NavLink>
                </nav>
                <Switch>
                    <Route path="/">
                        <Home></Home>
                    </Route>
                    <Route path="/CreateAccount">
                        <CreateAccount></CreateAccount>
                    </Route>
                    <Route path="/Login">
                        <Login></Login>
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