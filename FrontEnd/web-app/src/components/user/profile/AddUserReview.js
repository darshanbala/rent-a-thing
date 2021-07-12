import React from 'react';
import { Redirect } from 'react-router-dom';
import '../../../css/reviews.css';

class AddUserReview extends React.Component {

  constructor() {
    super();
    this.state = {
      review: '',
      rating: null,
      reviewAdded: false
    }
  }

  textInput(e) {
    const value = e.target.value
    const name = e.target.name
    this.setState({
      [name]: value
    })
  }

  changeStarRating(e) {
    let rating = e.target.value;
    rating = parseInt(rating);
    this.setState({
      rating: rating
    })
  }

  async submitUserReview(e) {
    //e.preventDefault();
    const { review, rating, title } = this.state
    //console.log(this.props.user)
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/postUserReview`,
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ review: review, star_rating: rating, user: this.props.user, title: title })
        }
    );
  }

  render() {
      const { review, title, reviewAdded } = this.state
      //console.log(this.props)
      if(reviewAdded){
        return(<Redirect to="/myAccount"/>)
      }

      const { user } = this.props


      return(
        <section id="review-body">
          <p>Leave a review:</p>
          <form>
          <input id='new_review_title' placeholder="Review title" type="text" name="title" id="title" value={title} onChange={(e) => this.textInput(e)} />
          <textarea id='new_review_input' name="review" rows="4" id="new_review" type="text" value={review} onChange={(e) => this.textInput(e)} /> <br/><br/>
          <select name="rating" id="rating" onChange={(e) => this.changeStarRating(e)}>
              <option value="">Give {user.first_name} a star rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
          </select>
          <br/>
          <input id='submit' type="submit" value="Submit review" onClick={(e) => {this.submitUserReview(e)}}/>
          </form>
        </section>
      )
    }
}

export default AddUserReview;
