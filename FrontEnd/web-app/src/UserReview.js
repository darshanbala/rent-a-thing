import React from 'react';

class UserReview extends React.Component {

  render() {
    const { review } = this.props
    //console.log(review)
    return(
      <section>
        <hr/>
        <h1 id="reviewer_name">{review.first_name} {review.last_name}</h1>
        <p>rating: {review.rating}/5</p>
        <h1>{review.title}</h1>
        <h2 id="review_content">{review.content}</h2>
        <p id="how_long_ago">{review.howLongAgo}</p>
      </section>
    )
  }
}

export default UserReview;
