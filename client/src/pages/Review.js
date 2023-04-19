import React, { useState, useContext } from "react";
import { Grid, Header, Button, Card, Form, Rating } from "semantic-ui-react";
import {UserContext} from "../components/App";

// function Review({ title, review_text, rating, onDeleteClick, onEditClick, onSaveClick, review, setReviews, user_id }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedTitle, setUpdatedTitle] = useState(title);
//   const [updatedReviewText, setUpdatedReviewText] = useState(review_text);
//   const[user, setUser] = useContext(UserContext)

//   const handleDeleteClick = () => {
//     onDeleteClick();
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//     if (onEditClick) {
//       onEditClick();
//     }
//   };

//   const handleCancelClick = () => {
//     setUpdatedTitle(title);
//     setUpdatedReviewText(review_text);
//     setIsEditing(false);
//   };

//   const handleSaveClick = () => {
//     onSaveClick(updatedTitle, updatedReviewText);
//     setIsEditing(false);
//     setReviews((prevReviews) => {
//       const newReviews = [...prevReviews];
//       const index = newReviews.findIndex((review) => review.title === title && review.review_text === review_text);
//       newReviews[index] = { ...newReviews[index], title: updatedTitle, review_text: updatedReviewText };
//       return newReviews;
//     });
//   };

//   return (
//     <Card fluid>
//       <Card.Content>
//         <Card.Header>
//           {isEditing ? (
//             <Form.Input
//               fluid
//               value={updatedTitle}
//               onChange={(e) => setUpdatedTitle(e.target.value)}
//             />
//           ) : (
//             title
//           )}
//         </Card.Header>
//         <Card.Meta>
//           {/* <span>{review.user_id}</span> */}
//           <Rating icon='star' defaultRating={rating} maxRating={10} disabled />
//         </Card.Meta>
//         <Card.Description>
//           {isEditing ? (
//             <Form.TextArea
//               value={updatedReviewText}
//               onChange={(e) => setUpdatedReviewText(e.target.value)}
//             />
//           ) : (
//             review_text
//           )}
//         </Card.Description>
//       </Card.Content>
//       <Card.Content extra>
//         {isEditing ? (
//           <div className='ui two buttons'>
//             <Button onClick={handleSaveClick}>Save</Button>
//             <Button basic onClick={handleCancelClick}>Cancel</Button>
//           </div>
//         ) : (
//           <div className='ui two buttons'>
//             <Button onClick={handleEditClick}>Edit</Button>
//             <Button onClick={handleDeleteClick}>Delete</Button>
//           </div>
//         )}
//       </Card.Content>
//     </Card>
//     // <Grid>
//     //   <Grid.Column centered verticalAlign="middle" style={{ padding: "300px", textAlign: 'left' }}>
//     //     <Header>
//     //       {isEditing ? (
//     //         <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
//     //       ) : (
//     //         title
//     //       )}
//     //     </Header>
//     //     <p>Username: {user}</p>
//     //     <p>Rating: {rating}</p>
//     //   </Grid.Column>
//     //   <Grid.Column  verticalAlign="middle" style={{ paddingRight: "300px" }}>
//     //     <p>
//     //       {isEditing ? (
//     //         <textarea value={updatedReviewText} onChange={(e) => setUpdatedReviewText(e.target.value)} />
//     //       ) : (
//     //         review_text
//     //       )}
//     //     </p>
//     //     {isEditing ? (
//     //       <Button.Group>
//     //         <Button onClick={handleSaveClick}>Save</Button>
//     //       </Button.Group>
//     //     ) : (
//     //       <Button.Group>
//     //         <Button onClick={handleEditClick}>Edit</Button>
//     //         <Button onClick={handleDeleteClick}>Delete</Button>
//     //       </Button.Group>
//     //     )}
//     //   </Grid.Column>
//     // </Grid>
//   );
// }

// export default Review;

// import React, { useState, useContext } from "react";
// import { Grid, Header, Button, Card, Form, Rating } from "semantic-ui-react";
// import { UserContext } from "../components/App";

// function Review({
//   title,
//   review_text,
//   rating,
//   onDeleteClick,
//   onEditClick,
//   onSaveClick,
//   review,
//   setReviews,
//   user_id,
// }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedTitle, setUpdatedTitle] = useState(title);
//   const [updatedReviewText, setUpdatedReviewText] = useState(review_text);
//   const [updatedRating, setUpdatedRating] = useState(rating);
//   const [user, setUser] = useContext(UserContext);

//   const handleDeleteClick = () => {
//     onDeleteClick();
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//     if (onEditClick) {
//       onEditClick();
//     }
//   };

//   const handleCancelClick = () => {
//     setUpdatedTitle(title);
//     setUpdatedReviewText(review_text);
//     setUpdatedRating(rating);
//     setIsEditing(false);
//   };

//   const handleSaveClick = () => {
//     onSaveClick(updatedTitle, updatedReviewText, updatedRating);
//     setIsEditing(false);
//     setReviews((prevReviews) => {
//       const newReviews = [...prevReviews];
//       const index = newReviews.findIndex(
//         (review) =>
//           review.title === title &&
//           review.review_text === review_text &&
//           review.rating === rating
//       );
//       newReviews[index] = {
//         ...newReviews[index],
//         title: updatedTitle,
//         review_text: updatedReviewText,
//         rating: updatedRating,
//       };
//       console.log(rating)
//       console.log(updatedRating)
//       return newReviews;
//     });
//   };

//   return (
//     <Card fluid>
//       <Card.Content>
//         <Card.Header>
//           {isEditing ? (
//             <Form.Input
//               fluid
//               value={updatedTitle}
//               onChange={(e) => setUpdatedTitle(e.target.value)}
//             />
//           ) : (
//             title
//           )}
//         </Card.Header>
//         <Card.Meta>
//           <Rating
//             icon="star"
//             defaultRating={updatedRating}
//             maxRating={10}
//             disabled={!isEditing}
//             onRate={({ rating }) => setUpdatedRating(rating)}
//           />
//         </Card.Meta>
//         <Card.Description>
//           {isEditing ? (
//             <Form.TextArea
//               value={updatedReviewText}
//               onChange={(e) => setUpdatedReviewText(e.target.value)}
//             />
//           ) : (
//             review_text
//           )}
//         </Card.Description>
//       </Card.Content>
//       <Card.Content extra>
//         {isEditing ? (
//           <div className="ui two buttons">
//             <Button color = "darkgreen" onClick={handleSaveClick}>Save</Button>
//             <Button color = "darkgreen" basic onClick={handleCancelClick}>Cancel</Button>
//           </div>
//         ) : (
//           <div className="ui two buttons">
//             <Button color = "darkgreen" onClick={handleEditClick}>Edit</Button>
//             <Button color = "darkgreen" onClick={handleDeleteClick}>Delete</Button>
//           </div>
//         )}
//       </Card.Content>
//     </Card>
//   );
// }

// export default Review;


function Review({ index, title, review_text, rating, onDeleteClick, onEditClick, onSaveClick, review, setReviews, user_id, user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedReviewText, setUpdatedReviewText] = useState(review_text);
  const [updatedRating, setUpdatedRating] = useState(rating);
  // const [user, setUser] = useContext(UserContext);

  // console.log(user)
  // console.log(setReviews)

  const handleDeleteClick = () => {
    // onDeleteClick(index);
    onDeleteClick();
  };

  const handleEditClick = () => {
    setIsEditing(true);
    if (onEditClick) {
      onEditClick();
    }
  };

  const handleCancelClick = () => {
    setUpdatedTitle(title);
    setUpdatedReviewText(review_text);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    onSaveClick(updatedTitle, updatedReviewText, updatedRating);
    setIsEditing(false);
    setReviews((prevReviews) => {
      const newReviews = [...prevReviews];
      const index = newReviews.findIndex((review) => review.title === title && review.review_text === review_text);
      newReviews[index] = { ...newReviews[index], title: updatedTitle, review_text: updatedReviewText, rating: updatedRating };
      return newReviews;
    });
  };

  return (
    <Card fluid className="reviewCards">
      <Card.Content>
        <Card.Header>
          {isEditing ? (
            <Form.Input
              fluid
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
          ) : (
            title
          )}
        </Card.Header>
        <Card.Meta>
          <span>Author: {user}<br/></span>
          <Rating 
              icon='star' 
              rating={updatedRating} 
              maxRating={10} 
              disabled={!isEditing} 
              onRate={(e, { rating }) => setUpdatedRating(rating)} 
              // onDeleteClick={handleDeleteReview}
              />
        </Card.Meta>
        <Card.Description>
          {isEditing ? (
            <Form.TextArea
              value={updatedReviewText}
              onChange={(e) => setUpdatedReviewText(e.target.value)}
            />
          ) : (
            review_text
          )}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {isEditing ? (
          <div className='ui two buttons'>
            <Button onClick={handleSaveClick}>Save</Button>
            <Button basic onClick={handleCancelClick}>Cancel</Button>
          </div>
        ) : (
          <div className='ui two buttons'>
            <Button onClick={handleEditClick}>Edit</Button>
            <Button onClick={() => handleDeleteClick()}>Delete</Button>
          </div>
        )}
      </Card.Content>
    </Card>
  );
}

export default Review;