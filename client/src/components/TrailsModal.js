// I DONT THINK THIS IS ANYTHING


// import React, { useState, useEffect, useContext } from "react";
// import { Modal, Comment, Button, Form } from "semantic-ui-react";
// import { UserContext } from "./App";

// function TrailsModal({ open, onClose, update }) {
//   const [reviews, setReviews] = useState([]);
//   const [newReview, setNewReview] = useState("");
//   const { user } = useContext(UserContext);

//   const handleDelete = (commentId) => {};

//   const handleEdit = (commentId) => {};

//   const handleAddReview = async () => {
//     try {
//       const response = await fetch(`/reviews/${reviews.id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ content: newReview }),
//       });
//       const data = await response.json();
//       setReviews([...reviews, data.review]);
//       setNewReview("");
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   console.log(reviews)
//   const handleNewReview = (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const formData = new FormData(form);
//     const reviewContent = formData.get("review");
//     const newReview = {
//       id: reviews.length + 1,
//       username: "User",
//       title: "",
//       content: reviewContent,
//     };
//     setReviews([...reviews, newReview]);
//     form.reset();
// };

// return (
//     <div style={{ backgroundColor: "#5B3E3E", borderRadius: "30px", padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
//         <Modal>
//         <Comment.Group>
//            {reviews.map((review) => (
//             <Comment key={review.id}>
//               <Comment.Content>
//                 <Comment.Author>{review.username}</Comment.Author>
//                 <Comment.Text>{review.content}</Comment.Text>
//                 {user && user.id === review.userId && (
//                   <Comment.Actions>
//                     <Comment.Action onClick={() => handleEdit(review.id)}>Edit</Comment.Action>
//                     <Comment.Action onClick={() => handleDelete(review.id)}>Delete</Comment.Action>
//                   </Comment.Actions>
//                 )}
//               </Comment.Content>
//             </Comment>
//           ))}
//         </Comment.Group>
//             <h3>Leave a Review for this Hike</h3>
//             <Form  onSubmit={handleNewReview}>
//             <Form.Field required widths="equal">
//                 <Form.Input
//                 required
//                 size="small"
//                 label="Title"
//                 placeholder="Review Title"
//                 name="title"
//                 style={{ borderRadius: "25px" }}
//                 />
//                 <Form.Input
//                 required
//                 size="small"
//                 label="review_text"
//                 placeholder="Review Here"
//                 name="review_text"
//                 style={{ borderRadius: "25px"  }}
//                 />
//                 <Form.Input
//                 required
//                 size="small"
//                 label="rating"
//                 placeholder="Rate between 1 and 10"
//                 name="rating"
//                 style={{ borderRadius: "25px"  }}
//                 />
//             </Form.Field>
//             <Form.Button color= 'darkgreen'>
//                 Submit
//             </Form.Button>
//             </Form>
//         </Modal>
//     </div>
 
// );
// }

// export default TrailsModal;