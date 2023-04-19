import React, { useEffect, useState } from "react";
import Review from "../pages/Review"
import { Card } from "semantic-ui-react";

function ReviewPage({reviews, setReviews}) {

  const handleReviewDelete = (index) => {
    const reviewId = reviews[index].id;
    fetch(`/reviews/${reviewId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete review');
      }
      setReviews((prevReviews) => {
        const newReviews = [...prevReviews];
        newReviews.splice(index, 1);
        return newReviews;
      });
    })
    .catch(error => {
      console.error(error);
    });
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
      setReviews((prevReviews) => {
        const newReviews = [...prevReviews];
        newReviews[index] = data;
        return newReviews;
      });
    })
    .catch(error => {
      console.error(error);
    });
  }

  const handleEditClick = (index) => {
    setReviews((prevReviews) => {
      const newReviews = [...prevReviews];
      newReviews[index].isEditing = true;
      return newReviews;
    });
  };

  const review = reviews?.length > 0 && reviews.map((review, index) => {
    return (
      <Review
        key={index}
        index={index}
        title={review.title}
        review_text={review.review_text}
        rating={review.rating}
        user={review.user.username}
        name = {review.trail.name}
        onDeleteClick={() => handleReviewDelete(index, review.id)}
        onEditClick={() => handleEditClick(index)}
        onSaveClick={(updatedTitle, updatedReviewText, updatedRating) =>
          handleReviewSave(index, {
            ...review,
            title: updatedTitle,
            review_text: updatedReviewText,
            rating: updatedRating
          })
        }
        isEditing={review.isEditing}
        setReviews={setReviews}
      />
    );
  });

  return (
    <Card.Group itemsPerRow={3}>
      {review}
    </Card.Group>
  );
}

export default ReviewPage;