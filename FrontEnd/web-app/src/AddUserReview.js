import React from 'react';

class AddUserReview extends React.Component {

  constructor() {
    super();
    this.state = {
      review: '',
      rating: null
    }
  }

  textInput(e) {
    const newReview = e.target.value
    this.setState({
      review: newReview
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
    e.preventDefault();
    const { review, rating } = this.state
    console.log(this.props.user)
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/postUserReview`,
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ review: review, star_rating: rating, user: this.props.user })
        }
    );
  }

  render() {
    const { user } = this.props
    const { review } = this.state
    console.log(review)
    return(
      <div>
        <br/>
        <p>Leave a review:</p>
        <form>
        <textarea rows="4" id="new_review" type="text" value={review} onChange={(e) => this.textInput(e)}/> <br/><br/>
        <select name="rating" id="rating" onChange={(e) => this.changeStarRating(e)}>
            <option value="">Give {user.first_name} a star rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <br/><br/>
        <input type="submit" value="Submit review" onClick={(e) => {this.submitUserReview(e)}}/>
        </form>
        <br/>
        <br/>
      </div>
    )
  }
}

export default AddUserReview;
