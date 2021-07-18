import React from 'react';
import '../../../css/Profile_page.css';
import UserReviews from './UserReviews.js';
import UserPosts from './UserPosts.js';
import UserLookingFor from './UserLookingFor';
import MyRentals from './MyRentals.js';
import profile_picture from './template_profile_picture.png';
//import React, { useState } from 'react'
import { ChatEngine, getOrCreateChat } from 'react-chat-engine'
//TODO make dynamic import for profile pictures based on the user
//and a link to their pp from the db

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      cityName: null,
      star_rating: `No reviews...`,
      justVisiting: null,
      newLoad: true
    };
  }
  async componentDidMount() {
    console.log('redirected')


    try{
      console.log(this.props.user)
      await this.getCity(this.props.user.city_id)
      this.props.cookieCheck();
      await this.getStarRating(this.props.state.user)
      this.setState({
        user: this.props.user,
        justVisiting: false
      })


  }catch{}
  try{
      this.setState({
        user: this.props.location.state.user,
        justVisiting: true
      })
      await this.getStarRating(this.props.location.state.user)

    }catch{}

    //this.setState({
    //  user: await this.props.checkWhoIsSignedIn()
    //})
  }
  async componentDidUpdate(PrevProps, PrevState) {
    if(this.state.star_rating === 'loading...'){
      await this.getStarRating(this.state.user)
    }
    try{
      if(this.state.cityName === null && this.state.user.city_id){
        await this.getCity(this.state.user.city_id)
      }
    }catch{}
    if(this.props !== PrevProps || this.state.cityName !== PrevState.cityName){
      this.forceUpdate()
    }
  }

  async getStarRating(user) {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}getStarRating`,
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: user.id })
        }
    );
    const { rating } = await response.json()
    if(!isNaN(rating)){
      this.setState({
        star_rating: rating
      })
    }

  }

  async getUser(user) {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}getStarRating`,
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: user.id })
        }
    );
  }

  async getCity(city_id) {
    if(!city_id){
      let user;
      try{
          user  = this.props.user
      }catch{user  = this.props.location.state.user}
      city_id = user.city_id
    }
    console.log(city_id)
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}getCity`,
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cityId: city_id})
        }
    );
    const city = await response.json();
    console.log(await city[0].name)
    const cityName = await city[0].name
    this.setState({cityName: cityName})
  }

  render() {
    let { user } = this.props
    let justVisiting = false
    const{ newLoad, cityName } = this.state
    console.log(newLoad)
    try{
        justVisiting  = this.props.location.state

      if(justVisiting){
        user = this.props.location.state.user
        //console.log(user)
        //this.getUser(user)
      }
    }catch{

    }
    console.log(justVisiting)
    console.log(user.img_url)
    //console.log('user @ profile render: '+JSON.stringify(user))
    //console.log(user.first_name)
    if(user){
      return(

          <section className='flex_container'>
            <div id='left'>
              <img src={user.img_url} id='profile_picture'/>
              <h1>{`${user.first_name} ${user.last_name}`}</h1>
              <p>Email: <a href={`mailto:${user.email}`}>{user.email}</a></p>
              <p>Average rating: {this.state.star_rating}</p>
              <p>City: {cityName}</p>
              <p>User since: {user.created_at.slice(0,4)}</p>
            </div>
            <div id='centre_spacer' />
            <div id='right'>
              { !justVisiting &&
                <MyRentals />
              }
                <UserReviews justVisiting={justVisiting} user={user} />
            </div>
          </section>

      )
    }else{
      return(
        <section>Loading...</section>
      )
    }
  }
}

export default Profile;
