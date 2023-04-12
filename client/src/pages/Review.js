// import React, { useState } from "react";
// import { Grid, Header, Button, Icon } from 'semantic-ui-react';

// function Review({ title, review_text, rating, user, onDeleteClick, onEditClick, onSaveClick }) {
//     const [isEditing, setIsEditing] = useState(false);
//     const [updatedTitle, setUpdatedTitle] = useState(title);
//     const [updatedReviewText, setUpdatedReviewText] = useState(review_text);
//     const [reviews, setReviews] = useState([]);

//     const handleDeleteClick = () => {
//         onDeleteClick();
//     }

//     const handleEditClick = () => {
//         setIsEditing(true);
//         if (onEditClick){
//             onEditClick();
//         }
//     }

//     const handleSaveClick = () => {
//         onSaveClick(updatedTitle, updatedReviewText);
//         setIsEditing(false);
//         setReviews((prevReviews) => {
//           const newReviews = [...prevReviews];
//           newReviews[index] = { ...newReviews[index], title: updatedTitle, review_text: updatedReviewText };
//           return newReviews;
//         });
//       }

//     return (
//         <Grid columns='equal'>
//             <Grid.Column>
//                 <Header>{isEditing ? <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} /> : title}</Header>
//                 <p>{user}</p>
//                 <p>{rating}</p>
//             </Grid.Column>
//             <Grid.Column centered verticalAlign="middle" style={{ paddingRight: '300px' }}>
//                 <p>{isEditing ? <textarea value={updatedReviewText} onChange={(e) => setUpdatedReviewText(e.target.value)} /> : review_text}</p>
//                 {isEditing ?
//                     <Button.Group>
//                         <Button onClick={handleSaveClick}>Save</Button>
//                     </Button.Group> :
//                     <Button.Group>
//                         <Button onClick={handleEditClick}>Edit</Button>
//                         <Button onClick={handleDeleteClick}>Delete</Button>
//                     </Button.Group>
//                 }
//                 {/* <Icon name='star' />
//                 {rating} */}
//             </Grid.Column>
//         </Grid>
//     );
// }

// export default Review;

import React, { useState } from "react";
import { Grid, Header, Button } from "semantic-ui-react";

function Review({ title, review_text, rating, user, onDeleteClick, onEditClick, onSaveClick, reviews, setReviews }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedReviewText, setUpdatedReviewText] = useState(review_text);

  const handleDeleteClick = () => {
    onDeleteClick();
  };

  const handleEditClick = () => {
    setIsEditing(true);
    if (onEditClick) {
      onEditClick();
    }
  };

  const handleSaveClick = () => {
    onSaveClick(updatedTitle, updatedReviewText);
    setIsEditing(false);
    setReviews((prevReviews) => {
      const newReviews = [...prevReviews];
      const index = newReviews.findIndex((review) => review.title === title && review.review_text === review_text);
      newReviews[index] = { ...newReviews[index], title: updatedTitle, review_text: updatedReviewText };
      return newReviews;
    });
  };

  return (
    <Grid columns="equal">
      <Grid.Column>
        <Header>
          {isEditing ? (
            <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
          ) : (
            title
          )}
        </Header>
        <p>{user}</p>
        <p>{rating}</p>
      </Grid.Column>
      <Grid.Column centered verticalAlign="middle" style={{ paddingRight: "300px" }}>
        <p>
          {isEditing ? (
            <textarea value={updatedReviewText} onChange={(e) => setUpdatedReviewText(e.target.value)} />
          ) : (
            review_text
          )}
        </p>
        {isEditing ? (
          <Button.Group>
            <Button onClick={handleSaveClick}>Save</Button>
          </Button.Group>
        ) : (
          <Button.Group>
            <Button onClick={handleEditClick}>Edit</Button>
            <Button onClick={handleDeleteClick}>Delete</Button>
          </Button.Group>
        )}
      </Grid.Column>
    </Grid>
  );
}

export default Review;