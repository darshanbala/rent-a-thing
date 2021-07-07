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

    state = { isLoggedIn: false, user: '' };

    async componentDidMount() {
      this.cookieCheck()
    }

    async cookieCheck(){
      const user = await this.checkWhoIsSignedIn()
      if(await user.id){
        this.toggleLoggedIn(this.state.isLoggedIn)
        this.setUser(user)
      }
    }

    async checkWhoIsSignedIn() {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/checkWhoIsSignedIn`, { method: 'GET', credentials: 'include' });
        const user = await response.json();
        return await user;
    }

    async toggleLoggedIn(arg) {
        if (arg) {
            this.setState({ isLoggedIn: false });
        } else {
            this.setState({ isLoggedIn: true });
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
                { !isLoggedIn &&
                  <nav className="navBar">
                      <NavLink className="navButton" to="/" activeClassName="active">Home</NavLink>
                      <NavLink className="navButton floatRight" to="/Login" activeClassName="active">Login</NavLink>
                      <NavLink className="navButton floatRight" to="/CreateAccount" activeClassName="active">Create Account</NavLink>
                  </nav>
                }
                { isLoggedIn &&
                  <nav className="navBar">
                      <NavLink className="navButton" to="/" activeClassName="active">Home</NavLink>
                      <NavLink className="navButton floatRight" to="/myAccount" activeClassName="active">Account</NavLink>
                      <NavLink className="navButton floatRight" to="/postItem" activeClassName="active">Post a new item</NavLink>
                  </nav>
                }
                <Switch>
                    <Route exact path="/">
                        <Home user={user} setUser={(arg) => this.setUser(arg)} toggleLoggedIn={(arg) => this.toggleLoggedIn(arg)} checkWhoIsSignedIn={() => this.checkWhoIsSignedIn()} ></Home>
                    </Route>
                    <Route path="/CreateAccount">
                        <CreateAccount user={user} setUser={(arg) => this.setUser(arg)} toggleLoggedIn={(arg) => this.toggleLoggedIn(arg)} checkWhoIsSignedIn={() => this.checkWhoIsSignedIn()} cookieCheck={() => this.cookieCheck()}/>
                    </Route>
                    <Route path="/Login">
                        <Login user={user} setUser={(arg) => this.setUser(arg)} toggleLoggedIn={(arg) => this.toggleLoggedIn(arg)} checkWhoIsSignedIn={() => this.checkWhoIsSignedIn()} cookieCheck={() => this.cookieCheck()}></Login>
                    </Route>
                </Switch>
                <div className="footer">
                  <p>Legal stuff | Contact Info | etc.</p>
                  {  isLoggedIn && <p>logged in as {user.first_name}</p>  }
                </div>
              </Router>

        );
    }
}

export default App;
