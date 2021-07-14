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
    this.refresh = this.refresh.bind(this)
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
          console.log(index)
          return(
              <UserReview key={index} review={review}/>
          )
        })}
        </div>
      )
  }
  refresh = () => {
    console.log('refreshing!!!!')
    this.forceUpdate();
  }

  render() {
    const { user, justVisiting } = this.props
    const { reviews } = this.state
    //console.log('user @ overall reviews page: '+JSON.stringify(user))
    if(reviews[0]){
    return(
      <section  id='reviews'>
      <section>
        <h2>Reviews</h2>
        {this.formattedReviews(user)}
      </section>
      { user && justVisiting && <AddUserReview user={user} /> }
    </section>
    )
    }else{
      return(
        <section id='reviews'>
          <h2>Reviews</h2>
          <p>Nothing to show...</p>

          {user && justVisiting &&
            <AddUserReview refreshPage={ (e) => {this.refresh()} } user={user} />}
        </section>
      )
    }
    }

}

export default UserReviews;
