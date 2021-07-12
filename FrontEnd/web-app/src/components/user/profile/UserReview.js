import React from 'react';
import '../../../css/reviews.css';

class UserReview extends React.Component {

  render() {
    const { review } = this.props
    //console.log(review)
    return(
      <section id='review-body'>
        <h1 id="reviewer_name">{review.first_name} {review.last_name}</h1>
        <h1 id='review-title'>{review.title}</h1>
        <h2 id="review_content">{review.content}</h2>
        <p id="how_long_ago">{review.howLongAgo}</p>
        <p id='rating'>rating: {review.rating}/5</p>
      </section>
    )
  }
}

export default UserReview;
