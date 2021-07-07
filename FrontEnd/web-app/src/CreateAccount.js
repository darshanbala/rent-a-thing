import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './index.css';

class CreateAccount extends Component {

    state = {
      valid_new_user: false,
      first_name: "",
      last_name: "",
      email: "",
      password1: "",
      password2: "",
      DoB: "",
      phone_number: "",
      address_1: "",
      address_2: "",
      city: "",
      postcode: "",
      validationMessage: null
     }

    constructor(props) {
        super(props);
        console.log("");
    }

    componentDidMount() {
        console.log("");
    }

    componentDidUpdate() {
        console.log("");
    }

    componentWillUnmount() {
        console.log("");
    }

    updateState(e) {

    }

    updateInfo(e) {
      const { name, value } = e.target;
      this.setState({
        [name]: value
      })
    }

    async submitEmailInfo(e) { //async
      e.preventDefault();
      const { email, password1, password2 } = this.state
      if(this.validateSubmit('first')) //And the user doesnt exist already
          {
        this.setState({
          valid_new_user: true,
          validationMessage: null
        })
      }else{
        this.setState({
          validationMessage: "Please ensure all fields are complete and valid"
        })
      }
    }

    async submitUser(e) {
      e.preventDefault()
      if(this.validateSubmit('second')){
        this.setState({validationMessage: null})
        const toBeSent = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          password1: this.state.password1,
          password2: this.state.password2,
          DoB: this.state.DoB,
          phone_number: this.state.phone_number,
          address_1: this.state.address_1,
          address_2: this.state.address_2,
          city: this.state.city,
          postcode: this.state.postcode
         }
        console.log('Body of fetch will be: '+JSON.stringify(toBeSent))
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/createAccount`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(toBeSent)
            }
        );
        console.log(await response.json())
      }else{
        this.setState({
          validationMessage: "Please ensure all fields are complete and valid"
        })
      }
    }

    validateLive(info) {
      const { first_name, last_name, email, password1, password2, DoB, phone_number, address_1, address_2, city, postcode } = this.state

      switch(info) {
        case first_name: {}
        break
        case last_name: {}
        break
        case email: {}
        break
        case password1: {
          if(password1.length < 8){
            return (<p className="error">Password must be at least 8 characters</p>)
          }
        }
        break
        case password2: {
          if(password2 !== password1){
            return (<p className="error">Passwords do not match</p>)
          }
        }
        break
        case DoB: {}
        break
        case phone_number: {
          if(phone_number[0] === "+"){
            if(phone_number.length !== 12) {
              return (<p className="error">Please enter a valid phone number</p>)
            }
          }else{
            if(phone_number.length !== 11) {
              return (<p className="error">Please enter a valid phone number</p>)
            }
          }
          for(const i of phone_number){
            if(isNaN(i)){
              return (<p className="error">Please enter a valid phone number</p>)
            }
          }
        }
        break
        case address_1: {}
        break
        case address_2: {}
        break
        case city: {}
        break
        case postcode: {} //Link to royal mail postcodes API
        break
      }
    }

    validateSubmit(which) {
      const { password1, password2, phone_number } = this.state

      if(which === 'first'){
        if(password2 !== password1 || password1.length < 8){
          return false
        }else{
          return true;
        }
      }else if(which === 'second'){
        if(phone_number[0] === "+"){
          if(phone_number.length !== 12) {
            return false
          }
        }else{
          if(phone_number.length !== 11) {
            return false
          }
        }
        for(const i of phone_number){
          if(isNaN(i)){
            return false
          }
        }
        return true;
      }
    }

    render() {
      const { validationMessage, valid_new_user, first_name, last_name, email, password1, password2, DoB, phone_number, address_1, address_2, city, postcode } = this.state
      if(!valid_new_user) {
          return(
            <main>
                <div>
                  <h1>CreateAccount</h1>
                  <form className="SubmitStory">
                      <section>
                        <label htmlFor="email" value="Email address: " >Email address: </label>
                        <input type="text" name="email" id="email" value={ email } onChange={(e) => this.updateInfo(e)}/>
                        <div>{this.validateLive(email)}</div>
                      </section>
                      <section>
                        <label htmlFor="password1" value="Password: " >Password: </label>
                        <input type="text" name="password1" id="password1" value={ password1 } onChange={(e) => this.updateInfo(e)}/>
                        <div>{this.validateLive(password1)}</div>
                      </section>
                      <section>
                        <label htmlFor="password2" value="Re-enter password: " value={ password2 } >Re-enter password: </label>
                        <input type="text" name="password2" id="password2" onChange={(e) => this.updateInfo(e)}/>
                        <div>{this.validateLive(password2)}</div>
                      </section>
                      <section>
                        <input type="submit"  onClick={(e) => this.submitEmailInfo(e)} value="Submit"/>
                        {validationMessage && <p className="error">{validationMessage}</p>}
                      </section>
                </form>
                </div>
              </main>
          );
      }
      else{
          return(
            <main>
                <div>
                  <h1>User details:</h1>
                  <form className="SubmitStory">
                    <section>
                      <label htmlFor="first_name" value="First name: " >First name: </label>
                      <input type="text" name="first_name" id="first_name" value={ first_name } onChange={(e) => this.updateInfo(e)}/>
                    </section>
                    <section>
                      <label htmlFor="last_name" value="Last name: " >Last name: </label>
                      <input type="text" name="last_name" id="last_name" value={ last_name } onChange={(e) => this.updateInfo(e)}/>
                    </section>
                    <section>
                      <label htmlFor="DoB" value="Date of birth : " >Date of birth : </label>
                      <input type="date" name="DoB" id="DoB" value={ DoB } onChange={(e) => this.updateInfo(e)}/>
                    </section>
                    <section>
                      <label htmlFor="phone_number" value="Phone number: " >Phone number: </label>
                      <input type="text" name="phone_number" id="phone_number" value={ phone_number } onChange={(e) => this.updateInfo(e)}/>
                      <div>{this.validateLive(phone_number)}</div>
                    </section>
                    <section>
                      <label htmlFor="address_1" value="Address line 1: " >Address line 1: </label>
                      <input type="text" name="address_1" id="address_1" value={ address_1 } onChange={(e) => this.updateInfo(e)}/>
                    </section>
                    <section>
                      <label htmlFor="address_2" value="Address line 2: " >Address line 2: </label>
                      <input type="text" name="address_2" id="address_2" value={ address_2 } onChange={(e) => this.updateInfo(e)}/>
                    </section>
                    <section>
                      <label htmlFor="city" value="City : " >City : </label>
                      <input type="text" name="city" id="city" value={ city } onChange={(e) => this.updateInfo(e)}/>
                    </section>
                    <section>
                      <label htmlFor="postcode" value="Postcode: " >Postcode: </label>
                      <input type="text" name="postcode" id="postcode" value={ postcode } onChange={(e) => this.updateInfo(e)}/>
                    </section>
                    <section>
                      <input type="submit" name="submit" value="Submit" onClick={(e) => this.submitUser(e)}/>
                      {validationMessage && <p className="error">{validationMessage}</p>}
                    </section>
                </form>
                </div>
              </main>
          )
      }
    }
}

export default CreateAccount;
