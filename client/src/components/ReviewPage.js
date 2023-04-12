
import React, { useEffect, useState } from "react";
import Review from "../pages/Review"
import {Card} from "semantic-ui-react";

function ReviewPage({reviews}){
    
    const review = reviews?.length > 0 && reviews.map((review) => {

        return (
            
            <Review
                title = {review.title}
                review_text = {review.review_text}
                rating = {review.rating}
                user = {review.user_id}
            />
        );
    });

    return (
    <Card.Group itemsPerRow={4}>
      {review}
    </Card.Group>
    )
}

export default ReviewPage;