import React, { Component } from 'react';
import './index.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from 'react-router-dom';
import Home from './components/home/Home';
import CreateAccount from './components/user/CreateAccount';
import Login from './components/user/Login';
import Item from './components/products/Item'
import Profile from './components/user/profile/Profile.js';
import PostItem from './components/products/PostItem';
import MyRentals from './components/user/profile/MyRentals'
import Categories from './components/products/Categories';
import ThingsHandler from './components/framework/ThingsHandler.js';
import About from './components/home/About';

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
  async logout() {
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
        await this.cookieCheck();
    }
  }

    render() {
        const { isLoggedIn, user, hasSearched, searchParams } = this.state;
        //console.log("USER:")
        //console.log(user);
        return (

            <Router>
                <div className="header">
                    RENT A THING
                </div>
                { !isLoggedIn &&
                  <nav className="navBar">
                      <NavLink className="navButton noUnderline" to="/home" activeClassName="active">Home</NavLink>
                      <NavLink className="navButton noUnderline" to="/categories" activeClassName="active">Categories</NavLink>
                      <NavLink className="navButton floatRight noUnderline" to="/about" activeClassName="active">About</NavLink>
                      <NavLink className="navButton floatRight noUnderline" to="/login" activeClassName="active">Login</NavLink>
                      <NavLink className="navButton floatRight noUnderline" to="/createaccount" activeClassName="active">Create Account</NavLink>
                  </nav>
                }
                { isLoggedIn &&
                  <nav className="navBar">
                      <NavLink className="navButton noUnderline" to="/home" activeClassName="active">Home</NavLink>
                      <NavLink className="navButton noUnderline" to="/categories" activeClassName="active">Categories</NavLink>
                      <NavLink className="navButton floatRight noUnderline" to="/about" activeClassName="active">About</NavLink>
                      <div className="navButton floatRight noUnderline" onClick={ () => { this.logout() } }>Logout</div>
                      <NavLink className="navButton floatRight noUnderline" to="/myaccount" activeClassName="active">Account</NavLink>
                      <NavLink className="navButton floatRight noUnderline" to="/postitem" activeClassName="active">Post a new item</NavLink>
                  </nav>
                }
                <main>
                <Switch>
                    <Route exact path="/Home">
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
                    <Route path="/About">
                        <About cookieCheck={() => this.cookieCheck()} />
                    </Route>
                    <Route path="/login">
                        <Login cookieCheck={() => this.cookieCheck()} />
                    </Route>
                    <Route path="/Item">
                        <Item cookieCheck={() => this.cookieCheck()}/>
                    </Route>
                    <Route path="/postItem">
                        <PostItem  user = {user} cookieCheck={() => this.cookieCheck()()}/>
                    </Route>
                    <Route path="/MyRentals">
                         <MyRentals cookieCheck={() => this.cookieCheck()}/>
                    </Route>
                    <Route path="/visitingUser" render={(props) => <Profile {...props} />}/>
                </Switch>
                </main>

                <div className="footer">
                    <p>Legal stuff | Contact Info | etc.</p>
                    {isLoggedIn && <p>logged in as {user.first_name}</p>}
                </div>
            </Router>
        );
    }
}

export default App;
