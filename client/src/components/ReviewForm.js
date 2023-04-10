import React, { useState } from "react";
import { Button, Error, Input, FormField, Label, Textarea } from "../styles";

function ReviewForm({ onLogin }) {
//   const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [review_text, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/reviews", {
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
            r.json().then((user) => onLogin(user));
        } else {
            r.json().then((err) => setErrors(err.errors));
        }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          autoComplete="off"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="review">Review</Label>
        <Input
          type="text"
          id="review_text"
          autoComplete="off"
          value={review_text}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="rating">Rating</Label>
        <Input
          type="text" //NEED TO FIGURE OUT HOW TO MAKE THIS 1-10 BOXES OR SOMETHING
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          autoComplete="off"
        />
      </FormField>
      <FormField>
        <Button type="submit">{isLoading ? "Loading..." : "Sign Up"}</Button>
      </FormField>
      <FormField>
        {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField>
    </form>
  );
}

export default ReviewForm;