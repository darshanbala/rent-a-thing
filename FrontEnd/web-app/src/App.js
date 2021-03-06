import React, { Component } from 'react';
import './index.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Redirect
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
import MessagePage from './components/user/profile/MessagePage.js';
import GenericPage from './components/framework/GenericPage';

class App extends Component {

    state = { isLoggedIn: false, user: '', redirect: false };

    async componentWillMount() {
        await this.cookieCheck()
    }

    async componentDidUpdate(PrevProps, PrevState) {
      if(this.state.redirect !== PrevState.redirect) {
        this.setState({redirect: false})
      }
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
        const response = await fetch(`${process.env.REACT_APP_API_URL}checkWhoIsSignedIn`, { method: 'GET', credentials: 'include' });
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
        `${process.env.REACT_APP_API_URL}logout`,
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
        this.setState({redirect: true})
        await this.cookieCheck();
    }
  }

    render() {
        const { redirect, isLoggedIn, user, hasSearched, searchParams } = this.state;
        //console.log("USER:")
        //console.log(user);
        return (

            <Router>
                <div className="header">
                    <NavLink to="/home" className='logo' activeClassName="logo"><strong>~</strong> RENT-A-THING <strong>~</strong></NavLink>
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
                      <NavLink className="navButton floatRight noUnderline" to="/myAccount" activeClassName="active">Account</NavLink>
                      <NavLink className="navButton floatRight noUnderline" to="/postItem" activeClassName="active">Post a new item</NavLink>
                      <NavLink className="navButton floatRight noUnderline" to="/messages" activeClassName="active">My Messages</NavLink>
                  </nav>
                }
                { redirect && <Redirect to='/' />}
                <main>
                <Switch>
                    <Route exact path={["/", "/home"]}>
                        <Home cookieCheck={ () => this.cookieCheck() } onHomePage={true} />
                    </Route>
                    <Route exact path="/categories">
                        <Categories cookieCheck={() => this.cookieCheck()} />
                    </Route>
                    <Route path="/createaccount">
                        <CreateAccount cookieCheck={() => this.cookieCheck()}/>
                    </Route>
                    <Route path="/myaccount">
                        <Profile user={user} cookieCheck={() => this.cookieCheck()}/>
                    </Route>
                    <Route path="/about">
                        <About cookieCheck={() => this.cookieCheck()} />
                    </Route>
                    <Route path="/login">
                        <Login cookieCheck={() => this.cookieCheck()} />
                    </Route>
                    <Route path="/Item">
                        <Item user={user} cookieCheck={() => this.cookieCheck()}/>
                    </Route>
                    <Route path="/postitem">
                        <PostItem  user = {user} cookieCheck={() => this.cookieCheck()()}/>
                    </Route>
                    <Route path="/myrentals">
                         <MyRentals cookieCheck={() => this.cookieCheck()}/>
                    </Route>
                    <Route path="/visitingUser" render={(props) => <Profile {...props} />}/>
                    <Route path="/messages">
                         <MessagePage user={user}cookieCheck={() => this.cookieCheck()}/>
                    </Route>
                    <Route path="/page">
                         <GenericPage user={user}cookieCheck={() => this.cookieCheck()}/>
                    </Route>
                </Switch>
                </main>

                <div className="footer">
                    <p>Legal stuff | Contact info | etc.</p>
                    {isLoggedIn && <p>Logged in as {user.first_name}</p>}
                </div>
            </Router>
        );
    }
}

export default App;
