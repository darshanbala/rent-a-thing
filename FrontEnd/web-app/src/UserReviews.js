import React from 'react';
import UserReview from './UserReview.js'
import './reviews.css'


class UserReviews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: [],
      user: this.props.user
    };
  }

  //async componentDidMount() {
  //  await this.getReviews();
  //}
  /*
  async componentDidUpdate(prevProps, prevState) {
    console.log(this.props)
    console.log(prevProps)
    if(this.props !== prevProps && this.props.user !== null){
      this.setState({user: this.props.user})
      await this.getReviews()
    }

  }
  */

  async getReviews() {
    const { user } = this.props
    console.log(this.props)
    console.log('USER = '+JSON.stringify(user))
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/getUserReviews`,
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user })
        }
    );
    const reviews = await response.json()
    console.log(await reviews)
    this.setState({ reviews: await reviews});
  }

  formattedReviews() {
    const { reviews } = this.state;
      return(
        <div>
        {reviews.map((review) => {
          return(
            <div>
              <UserReview review={review}/>
              <hr/>
              </div>
          )
        })}
        </div>
      )
  }

  render() {
    const { user } = this.props
    const { reviews } = this.state
    console.log('user @ overall reviews page: '+JSON.stringify(user))
    console.log('current reviews state: '+JSON.stringify(this.state))
    if(reviews[0]){
    return(
      <section id='reviews'>
        <h2>{`${user.first_name}'s`} reviews</h2>
        {this.formattedReviews(user)}
      </section>
    )
    }else{
      return(
        <section id='reviews'>
          <h2>{`${user.first_name}'s`} reviews</h2>
          <p>no reviews yet...</p>
        </section>
      )
    }
    }

}

export default UserReviews;
