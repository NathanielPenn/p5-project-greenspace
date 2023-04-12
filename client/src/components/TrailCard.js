import React, { useState } from "react";
import { Card, Comment } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

function TrailCard({
  name,
  location,
  state,
  distance,
  elevation,
  difficulty,
  // reviews
}) {
  // CHANGE CARD TO BACK TO SEE THE MAP LOCATION?
  // const [showFront, setShowFront] = useState(true);

  // const toggleCard = () => {
  //   setShowFront(!showFront);
  // };


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
export default TrailCard;