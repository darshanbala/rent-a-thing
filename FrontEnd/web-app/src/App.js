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
import Things from './Things'
import Item from './Item'
import Logout from './Logout';
import Profile from './Profile.js';
import PostItem from './PostItem';
import MyRentals from './MyRentals'
import Categories from './Categories';
import ThingsHandler from './ThingsHandler';

class App extends Component {

    state = { isLoggedIn: false, user: '' };

    async componentWillMount() {
        await this.cookieCheck()
    }

    async cookieCheck(){  //Checks who is signed in and if anyone is, sets the user and toggles isLoggedIn
      const user = await this.checkWhoIsSignedIn()
      //if(await user.id){
        //this.toggleLoggedIn(this.state.isLoggedIn)
        this.toggleLoggedIn(user);
        this.setUser(user)
      //}
    }

    async checkWhoIsSignedIn() {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/checkWhoIsSignedIn`, { method: 'GET', credentials: 'include' });
        const user = await response.json();
        return await user;
    }

    async toggleLoggedIn(arg) {
        /*
        if (arg) {
            this.setState({ isLoggedIn: false });
        } else {
            this.setState({ isLoggedIn: true });
        }
        */
        if (arg) {
            this.setState({ isLoggedIn: true });
        } else {
            this.setState({ isLoggedIn: false });
        }
    }

    setUser(updatedUserValue) {
        this.setState(state => ({ ...state, user: updatedUserValue }));
    }

/*
    async submitSearch(params) {
        this.setState({
          hasSearched: true,
          searchParams: params
        })
    }
*/

    render() {
        const { isLoggedIn, user, hasSearched, searchParams } = this.state;
        //console.log("USER:")
        //console.log(user);
        return (

            <Router>
                <div className="header">
                    Rent A Thing
                </div>
                { !isLoggedIn &&
                  <nav className="navBar">
                      <NavLink className="navButton noUnderline" to="/" activeClassName="active">Home</NavLink>
                      <NavLink className="navButton noUnderline" to="/Categories" activeClassName="active">Categories</NavLink>
                      <NavLink className="navButton floatRight noUnderline" to="/Login" activeClassName="active">Login</NavLink>
                      <NavLink className="navButton floatRight noUnderline" to="/CreateAccount" activeClassName="active">Create Account</NavLink>
                  </nav>
                }
                { isLoggedIn &&
                  <nav className="navBar">
                      <NavLink className="navButton noUnderline" to="/" activeClassName="active">Home</NavLink>
                      <NavLink className="navButton noUnderline" to="/Categories" activeClassName="active">Categories</NavLink>
                      <NavLink className="navButton floatRight noUnderline" to="/logout" activeClassName="active">Logout</NavLink>
                      <NavLink className="navButton floatRight noUnderline" to="/myAccount" activeClassName="active">Account</NavLink>
                      <NavLink className="navButton floatRight noUnderline" to="/postItem" activeClassName="active">Post a new item</NavLink>
                  </nav>
                }
                <Switch>
                    <Route exact path="/">
                        <Home cookieCheck={ () => this.cookieCheck() } /> 
                    </Route>
                    <Route exact path="/Categories">
                        <Categories cookieCheck={() => this.cookieCheck()} />
                    </Route>
                    <Route path="/CreateAccount">
                        <CreateAccount cookieCheck={() => this.cookieCheck()}/>
                    </Route>
                    <Route path="/myAccount">
                        <Profile user={user} cookieCheck={() => this.cookieCheck()}/>
                    </Route>
                    <Route path="/login">
                        <Login cookieCheck={() => this.cookieCheck()} />
                    </Route>
                    <Route path="/Logout">
                        <Logout cookieCheck={() => this.cookieCheck()} />
                    </Route>
                    <Route path="/Things">
                        <Things cookieCheck={() => this.cookieCheck()}/>
                    </Route>
                    <Route path="/Item">
                        <Item cookieCheck={() => this.cookieCheck()}/>
                    </Route>
                    <Route path="/postItem">
                        <PostItem  userID = {user.id} cookieCheck={() => this.cookieCheck()()}/>
                    </Route>
                    <Route path="/MyRentals">
                         <MyRentals cookieCheck={() => this.cookieCheck()}/>
                    </Route>
                </Switch>

                <div className="footer">
                    <p>Legal stuff | Contact Info | etc.</p>
                    {isLoggedIn && <p>logged in as {user.first_name}</p>}
                </div>
            </Router>
        );
    }
}

export default App;
