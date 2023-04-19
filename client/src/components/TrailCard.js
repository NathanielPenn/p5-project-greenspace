import React, { useState, useEffect } from "react";
import { Card, Comment, Header } from "semantic-ui-react";
import { NavLink, useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import Review from "../pages/Review"

function TrailCard({
    onDeleteClick,
    handleReviewDelete,
    index,
    reviews,
    setReviews,
    user,
    onSaveClick,
    handleSaveClick,
    setRefresh,
    refresh
  
}) 
{
  const { id } = useParams();
  const [trail, setTrail] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [trailReviews, setTrailReviews] = useState([])

    useEffect(() => {
    fetch(`/trails/${id}`)
      .then(response => response.json())
      .then(data => setTrail(data))
      .catch(error => console.error(error));
  }, [id]);

  useEffect(() => {
    fetch(`/trails/${id}/reviews`)
      .then(response => response.json())
      .then(data => setTrailReviews(data))
      .catch(error => console.error(error));
  }, [id, refresh]);

  function addReview(newReview) {
    setReviews([newReview, ...reviews])
  }

  const handleDeleteClick = (index, reviewId) => {
    handleReviewDelete(index, reviewId);
  };

  const handleReviewSave = (index, updatedReview) => {
    // console.log(updatedReview)
    // console.log(index)
    fetch(`/reviews/${updatedReview.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: updatedReview.title,
        review_text: updatedReview.review_text,
        rating: updatedReview.rating
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update review');
      }
      return response.json();
    })
    .then(data => {
      setTrailReviews((prevReviews) => {
        const newReviews = [...prevReviews];
        newReviews[index] = data;
        return newReviews;
      });
    })
    .catch(error => {
      console.error(error);
    });
  }
  
  // CHANGE CARD TO BACK TO SEE THE MAP LOCATION?
  // const [showFront, setShowFront] = useState(true);

  // const toggleCard = () => {
  //   setShowFront(!showFront);
  // };

  const handleReviewClick = () => {
    setShowReviewForm(!showReviewForm);
  };
  if (trail){
  // console.log(trail)
  // console.log({ name, location, state, distance, elevation, difficulty });
  const {name, location, state, distance, elevation, difficulty } = trail

  return (
    
    <Card centered>
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Meta>{location}, {state}</Card.Meta>
      <Card.Description>
        <p>Distance: {distance}</p>
        <p>Elevation Change: {elevation} ft.</p>
        <p>Difficulty: {difficulty}</p>
      </Card.Description>
      <Card.Content>
        {Array.isArray(trailReviews) && trailReviews.map((review, index) => (
              <Review
                key={review.id}
                title={review.title}
                review_text={review.review_text}
                rating={review.rating}
                user = {review.user.username}
                name = {review.trail.name}
                onDeleteClick={() => handleReviewDelete(index, review.id)}
                onSaveClick={(updatedTitle, updatedReviewText, updatedRating) =>
                  handleReviewSave(index, {
                    ...review,
                    title: updatedTitle,
                    review_text: updatedReviewText,
                    rating: updatedRating
                  })
                }
                setReviews = {setReviews}
                // setTrailReviews = {setTrailReviews}
              />
        ))}
      </Card.Content>
      <Card.Content extra>
          <div className="ui two buttons">
            <button className="ui basic button" onClick={handleReviewClick}>
              {showReviewForm ? "Cancel" : "Leave a Review"}
            </button>
          </div>
          {showReviewForm && <ReviewForm setReviews ={setReviews} setTrailReiews = {setTrailReviews} setRefresh = {setRefresh} addReview = {addReview} id = {id} />}
        </Card.Content>
    </Card.Content>
  </Card>
);

}
  else {
    return (
      <h1>Loading...</h1>
    )
  }}
export default TrailCard;