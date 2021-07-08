import React from 'react';

class UserReview extends React.Component {

  render() {
    const { review } = this.props
    console.log(review)
    return(
      <div>
        <h1 id="reviewer_name">{review.user.first_name} {review.user.last_name}</h1>
        <h2 id="review_content">{review.content}</h2>
        <p id="how_long_ago">{review.howLongAgo}</p>
      </div>
    )
  }
}

export default UserReview;
