import React from 'react';
import './Profile_page.css';
import UserReviews from './UserReviews.js';
import UserPosts from './UserPosts.js';
import UserLookingFor from './UserLookingFor';
import profile_picture from './template_profile_picture.png';
//TODO make dynamic import for profile pictures based on the user
//and a link to their pp from the db

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      star_rating: 'loading...'
    };
  }
  async componentDidMount() {
    this.props.cookieCheck();
    await this.getStarRating(this.props.user)
    //this.setState({
    //  user: await this.props.checkWhoIsSignedIn()
    //})
  }
  async componentDidUpdate() {
    if(this.state.star_rating === 'loading...'){
      await this.getStarRating(this.props.user)
    }
  }

  async getStarRating(user) {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/getStarRating`,
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

  render() {
    const { user } = this.props
    //console.log(this.props)
    //console.log('user @ profile render: '+JSON.stringify(user))
    if(user){
      return(
        <main>
          <section className='flex_container'>
            <div id='left'>
              <img src={profile_picture} id='profile_picture'/>
              <h1>{`${user.first_name} ${user.last_name}`}</h1>
              <p>email: {user.email}</p>
              <p>average rating: {this.state.star_rating}</p>
              <p>city: {user.city}</p>
              <p>User since: {user.created_at.slice(0,4)}</p>
            </div>
            <div id='centre_spacer' />
            <div id='right'>
              <UserPosts user={user} />
              <UserLookingFor user={user} />
              <UserReviews user={user} />
            </div>
          </section>
          <p>QUICKFIX FOR PAGE SPACING... REMOVE ME AND FIX CSS</p>
          <p>QUICKFIX FOR PAGE SPACING... REMOVE ME AND FIX CSS</p>
          <p>QUICKFIX FOR PAGE SPACING... REMOVE ME AND FIX CSS</p>
          <p>QUICKFIX FOR PAGE SPACING... REMOVE ME AND FIX CSS</p>
        </main>
      )
    }else{
      return(
        <section>Loading...</section>
      )
    }
  }
}

export default Profile;
