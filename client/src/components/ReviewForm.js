import React, { useState } from "react";
import {useHistory} from 'react-router-dom';
import { Button, Error, Input, FormField, Label, Textarea } from "../styles";
import {Form} from 'semantic-ui-react'

function ReviewForm({ id, addReview, setRefresh}) {
//   const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [review_text, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch(`/reviews/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // username,
            title,
            review_text,
            rating,
        }),
    }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((r) => {
            console.log(r);
            addReview(r);
            setTitle("");
            setReviewText("");
            setRating("");
            setSubmitted(true);
            setRefresh(prev => !prev)
            e.target.reset()
          })
            history.push(`${id}`)
        } else {
            r.json().then((err) => setErrors(err.errors));
        }
    });
  }

  if (submitted) {
    return <p>Review Submitted!</p>;
  }


  return (
    <Form onSubmit={handleSubmit}>
      <FormField>
        <Label htmlFor="title">Title:</Label>
        <Input
          type="text"
          id="title"
          autoComplete="off"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="review">Review:</Label>
        <Form.TextArea
          
          type="text"
          id="review_text"
          autoComplete="off"
          value={review_text}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="rating">Rating 1-10:</Label>
        <Form.Input
          error = 'Please enter a rating between 1 and 10'
          type="text"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          autoComplete="off"
        />
      </FormField>
      <FormField>
        <Button type="submit">{isLoading ? "Loading..." : "SUBMIT"}</Button>
      </FormField>
      <FormField>
        {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField>
    </Form>
  );
}

export default ReviewForm;