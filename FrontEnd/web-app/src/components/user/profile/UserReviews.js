import React from 'react';
import UserReview from './UserReview.js';
import AddUserReview from './AddUserReview';
import '../../../css/reviews.css';


class UserReviews extends React.Component {
  constructor(props) {
    super(props)
    //console.log('AAAAAAAA '+JSON.stringify(props))
    this.state = {
      reviews: [],
      user: ''
    };
  }

/*
  async componentDidMount() {
    await this.getReviews();
  }
*/


  async componentDidUpdate(prevProps, prevState) {
    //console.log(this.props)
    //console.log(prevProps)
    if(this.props !== prevProps && this.props.user !== ''){
      this.setState({user: this.props.user})
      await this.getReviews()
    }

  }



  async getReviews() {
    const { user } = this.state
    //console.log('USER REVIEWS PROPS '+JSON.stringify(this.props))
    //console.log('USER = '+JSON.stringify(user))

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
    //console.log(await reviews)
    this.setState({ reviews: await reviews});
  }

  formattedReviews() {
    const { reviews } = this.state;
      return(
        <div id="review_container">
        {reviews.map((review, index) => {

          return(
            <div>
              <UserReview key={index} review={review}/>
              </div>
          )
        })}
        </div>
      )
  }

  render() {
    const { user } = this.props
    const { reviews } = this.state
    //console.log('user @ overall reviews page: '+JSON.stringify(user))
    if(reviews[0]){
    return(
      <div  id='reviews'>
      <section>
        <h2>Reviews</h2>
        {this.formattedReviews(user)}
      </section>
      { user && <AddUserReview user={user} /> }
      </div>
    )
    }else{
      return(
        <section id='reviews'>
          <h2>Reviews</h2>
          <p>Loading...</p>
          {user && <AddUserReview user={user} />}
        </section>
      )
    }
    }

}

export default UserReviews;
