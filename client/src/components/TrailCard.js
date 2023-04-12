import React, { useState, useEffect } from "react";
import { Card, Comment } from "semantic-ui-react";
import { NavLink, useParams } from "react-router-dom";

function TrailCard({ 
    // name,
    // location,
    // state,
    // distance,
    // elevation,
    // difficulty,
    // // reviews}
  
}) 
{
  const { id } = useParams();
  const [trail, setTrail] = useState(null);

    useEffect(() => {
    fetch(`/trails/${id}`)
      .then(response => response.json())
      .then(data => setTrail(data))
      .catch(error => console.error(error));
  }, [id]);
  // CHANGE CARD TO BACK TO SEE THE MAP LOCATION?
  // const [showFront, setShowFront] = useState(true);

  // const toggleCard = () => {
  //   setShowFront(!showFront);
  // };
  if (trail){
  console.log(trail)
  // console.log({ name, location, state, distance, elevation, difficulty });
  const {name, location, state, distance, elevation, difficulty } = trail


  return (
    
    <Card>
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Meta>{location}, {state}</Card.Meta>
      <Card.Description>
        <p>Elevation: {elevation}</p>
        <p>Distance: {distance}</p>
        <p>Difficulty: {difficulty}</p>
      </Card.Description>
    </Card.Content>
    {/* <Card.Content extra>
      <Comment.Group>
        <Comment>
          <Comment.Content>
            <Comment.Author>John Doe</Comment.Author>
            <Comment.Metadata>
              <div>Today</div>
            </Comment.Metadata>
            <Comment.Text>
              <p>This trail was amazing!</p>
            </Comment.Text>
          </Comment.Content>
        </Comment>
        <Form reply>
          <Form.TextArea />
          <Button content='Add Reply' labelPosition='left' icon='edit' primary />
        </Form>
      </Comment.Group>
    </Card.Content> */}
  </Card>
);

}
else {
  return (
    <h1>Loading...</h1>
  )
}}
export default TrailCard;