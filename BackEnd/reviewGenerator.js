const templateReviews = [
  {title: 'Good renter', content: 'Always returns items on time', star_rating: 5},
  {title: 'would not rent to them again', content: 'did not return the item in good condition', star_rating: 1},
  {title: 'not good, not bad', content: 'slight scuffs on the item but not a bad user to deal with', star_rating: 3},
  {title: 'would borrow from them again', content: 'Item was in good condition & they even delivered and picked up the item for me.', star_rating: 4},
  {title: 'late returner', content: 'returned the item late, but in good condition', star_rating: 2},
  {title: 'dissapeared with my item', content: 'they rented my item and then blocked my phone number, do not lend to them.', star_rating: 1},
  {title: 'rented my item out again for more money', content: 'This user rented my item out for more money than i rented it to them for, for a month at a time. Not trusted with my things again.', star_rating: 1},
  {title: 'great experience', content: 'dropped of the item for me and picked it up when i was done. Top job!', star_rating: 5},
  {title: 'not very responsive', content: 'Not very responsive once they had my item but returned it on time undamaged.', star_rating: 3},
  {title: 'Returned a different item', content: 'Rented my item, sold it and gave me back another one in worse condition.', star_rating: 1},
]

const reviews = []

const reviewNum = 100
const numberOfUsers = 45;

for(let i = 0; i < reviewNum; i++) {
  const users = getUsers()
  const review = getReview()

  const reviewFormatted = `INSERT INTO user_reviews(reviewer_id, reviewee_id, review_title, review_content, star_rating, created_at) VALUES (${users.reviewer}, ${users.reviewee}, '${review.title}', '${review.content}', ${review.star_rating}, NOW());`
  reviews.push(reviewFormatted)
}
for(const review of reviews) {
  console.log(review)
}


function getUsers() {
  const reviewer = Math.floor((Math.random() * numberOfUsers))
  let reviewee = Math.floor((Math.random() * numberOfUsers))
  while(reviewer === reviewee) {
    reviewee = Math.floor((Math.random() * numberOfUsers))
  }
  return {reviewer: reviewer, reviewee: reviewee}
}


function getReview() {
  const reviewId = Math.floor(Math.random() * templateReviews.length);
  const review = templateReviews[reviewId]
  return review
}
