import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../index.css';
import City from '../framework/City';

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
    validationMessage: null,
    validEmail: true,
    successfullySubmitted: false,
    cityOptions: null,
    hasChosenCountry: false,
    cityName: ''
  }

  constructor(props) {
    super(props);
    console.log("");
  }

  async componentDidMount() {
    this.props.cookieCheck();
    const response = await fetch('http://localhost:8080/cities', {
      method: 'GET',
      credentials: 'include'
    })
    const cityOptions = await response.json()
    this.setState({ cityOptions });

    // NEW GeoDB STUFF
    /*
    const newResponse = await fetch(
      "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          "x-rapidapi-key": "b97ae692c1msh0cd7be3cd458128p1504dajsn77a8dde2b6be",
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
        }
      }
    );
    const isSuccess = await newResponse.json();
    console.log(isSuccess);
    */

    /*
    fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/cities", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "b97ae692c1msh0cd7be3cd458128p1504dajsn77a8dde2b6be",
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
      */
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
    if (this.validateSubmit('first')) //And the user doesnt exist already
    {
      this.setState({
        valid_new_user: true,
        validationMessage: null
      })
    } else {
      this.setState({
        validationMessage: "Please ensure all fields are complete and valid"
      })
    }
  }

  async submitUser(e) {
    e.preventDefault()
    if (this.validateSubmit('second')) {
      this.setState({ validationMessage: null })
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
      const isSuccess = await response.json()

      if (isSuccess.code === 200) {
        this.props.cookieCheck()
        this.setState({ successfullySubmitted: true })
      }
    } else {
      this.setState({
        validationMessage: "Please ensure all fields are complete and valid"
      })
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.email !== this.state.email && this.state.email !== '') {
      await this.checkValidEmail()
    }
  }

  async checkValidEmail() {
    const { email } = this.state
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/isValidNewEmail`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      }
    )
    const isEmailValid = await response.json()
    if (await isEmailValid !== this.state.validEmail) {
      this.setState({ validEmail: isEmailValid })
    }
  }

  validateLive(info) {
    const { first_name, last_name, email, password1, password2, DoB, phone_number, address_1, address_2, city, postcode } = this.state

    switch (info) {
      case first_name: { }
        break
      case last_name: { }
        break
      case email: { }
        break
      case password1: {
        if (password1.length < 8) {
          return (<p className="error">Password must be at least 8 characters</p>)
        }
      }
        break
      case password2: {
        if (password2 !== password1) {
          return (<p className="error">Passwords do not match</p>)
        }
      }
        break
      case DoB: { }
        break
      case phone_number: {
        if (phone_number[0] === "+") {
          if (phone_number.length !== 12) {
            return (<p className="error">Please enter a valid phone number</p>)
          }
        } else {
          if (phone_number.length !== 11) {
            return (<p className="error">Please enter a valid phone number</p>)
          }
        }
        for (const i of phone_number) {
          if (isNaN(i)) {
            return (<p className="error">Please enter a valid phone number</p>)
          }
        }
      }
        break
      case address_1: { }
        break
      case address_2: { }
        break
      case city: { }
        break
      case postcode: { } //Link to royal mail postcodes API
        break
    }
  }

  validateSubmit(which) {
    const { validEmail, password1, password2, phone_number } = this.state

    if (which === 'first') {
      if (password2 !== password1 || password1.length < 8 || !validEmail) {
        return false
      } else {
        return true;
      }
    } else if (which === 'second') {
      if (phone_number[0] === "+") {
        if (phone_number.length !== 12) {
          return false
        }
      } else {
        if (phone_number.length !== 11) {
          return false
        }
      }
      for (const i of phone_number) {
        if (isNaN(i)) {
          return false
        }
      }
      return true;
    }
  }
  /*
  myFunction(e) {
    e.classList.toggle("show");
  }
  */
  /*
  filterFunction(e) {
    const filter = e.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }
*/

  async changeCity(e) {
    //console.log(e.target.innerHTML);
    e.preventDefault();
    const cityName = e.target.innerHTML; // Get city string i.e. Glasgow
    console.log(cityName);
    //this.setState({ city });

    //this.props.cookieCheck();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/getCity`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cityName })
      }
    );
    const cityId = await response.json(); // Get city id associated with i.e. Glasgow
    //const cityOptions = await response.json()
    console.log(cityId[0].id);
    this.setState({ city: cityId[0].id, hasChosenCountry: true, cityName: cityName });  // set user city to this id so in future user and other components can searh for location id and get city name back
  }

  render() {
    const { successfullySubmitted, validEmail, validationMessage, valid_new_user, first_name, last_name, email, password1, password2, DoB, phone_number, address_1, address_2, city, postcode, cityOptions, hasChosenCountry, cityName } = this.state
    //console.log("CITIES:");
    //console.log(cityOptions);
    if (successfullySubmitted) {
      return (<Redirect to="/" />);
    }

    if (!valid_new_user) {
      return (
        <section>
            <h1>CreateAccount</h1>
            <form className="SubmissionForm">
              <section>
                <label htmlFor="email" value="Email address: " >Email address: </label>
                <input type="text" name="email" id="email" value={email} onChange={(e) => this.updateInfo(e)} />
                {!validEmail && <p className="error" >email address unavailable</p>}
              </section>
              <section>
                <label htmlFor="password1" value="Password: " >Password: </label>
                <input type="text" name="password1" id="password1" value={password1} onChange={(e) => this.updateInfo(e)} />
                <div>{this.validateLive(password1)}</div>
              </section>
              <section>
                <label htmlFor="password2" value="Re-enter password: " value={password2} >Re-enter password: </label>
                <input type="text" name="password2" id="password2" onChange={(e) => this.updateInfo(e)} />
                <div>{this.validateLive(password2)}</div>
              </section>
              <section>
                <input type="submit" onClick={(e) => this.submitEmailInfo(e)} value="Submit" />
                {validationMessage && <p className="error">{validationMessage}</p>}
              </section>
            </form>
        </section>
      );
    }
    else {
      return (
        <section>
            <h1>User details:</h1>
            <form className="SubmissionForm">
              <section>
                <label htmlFor="first_name" value="First name: " >First name: </label>
                <input type="text" name="first_name" id="first_name" value={first_name} onChange={(e) => this.updateInfo(e)} />
              </section>
              <section>
                <label htmlFor="last_name" value="Last name: " >Last name: </label>
                <input type="text" name="last_name" id="last_name" value={last_name} onChange={(e) => this.updateInfo(e)} />
              </section>
              <section>
                <label htmlFor="DoB" value="Date of birth : " >Date of birth : </label>
                <input type="date" name="DoB" id="DoB" value={DoB} onChange={(e) => this.updateInfo(e)} />
              </section>
              <section>
                <label htmlFor="phone_number" value="Phone number: " >Phone number: </label>
                <input type="text" name="phone_number" id="phone_number" value={phone_number} onChange={(e) => this.updateInfo(e)} />
                <div>{this.validateLive(phone_number)}</div>
              </section>
              <section>
                <label htmlFor="address_1" value="Address line 1: " >Address line 1: </label>
                <input type="text" name="address_1" id="address_1" value={address_1} onChange={(e) => this.updateInfo(e)} />
              </section>
              <section>
                <label htmlFor="address_2" value="Address line 2: " >Address line 2: </label>
                <input type="text" name="address_2" id="address_2" value={address_2} onChange={(e) => this.updateInfo(e)} />
              </section>
              <section>
              <div className="cityParent">
                <label htmlFor="city" value="City : " >City : </label>
                <br/>
                {/*<input type="text" name="city" id="city" value={city} onChange={(e) => this.updateInfo(e)} />*/}
                <section id='cities_section'>
                { !hasChosenCountry && cityOptions.map(({ id, name }) => <div className="cityCard" onClick={(e) => this.changeCity(e)} key={id} value={name}>{name}</div>)}
                { hasChosenCountry && <div className="chosenCityCard" onClick={(e) => this.changeCity(e)} value={cityName}>{cityName}</div>}
                </section>
                {/*<City key={id} id={id} name={name} />*/}
                {/*
                <div className="dropdown">
                  <button onClick={(e) => this.myFunction(e)} className="dropbtn">Dropdown</button>
                  <div id="myDropdown" className="dropdown-content">
                    <input type="text" placeholder="Search.." id="myInput">
                      <a href="#about">About</a>
                      <a href="#base">Base</a>
                      <a href="#blog">Blog</a>
                      <a href="#contact">Contact</a>
                      <a href="#custom">Custom</a>
                      <a href="#support">Support</a>
                      <a href="#tools">Tools</a>
                    </input>
                  </div>
                </div>
                */}
                </div>
              </section>
              <section>
                <label htmlFor="postcode" value="Postcode: " >Postcode: </label>
                <input type="text" name="postcode" id="postcode" value={postcode} onChange={(e) => this.updateInfo(e)} />
              </section>
              <section>
                <input type="submit" name="submit" value="Submit" onClick={(e) => this.submitUser(e)} />
                {validationMessage && <p className="error">{validationMessage}</p>}
              </section>
            </form>
        </section>
      )
    }
  }
}

export default CreateAccount;