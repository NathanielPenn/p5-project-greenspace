import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { Grid, Header, Card } from 'semantic-ui-react'


function Trails() {
  // const { id } = useParams();
  const [trails, setTrails] = useState([]);
  // const [trail, setTrail] = useState(null);

  useEffect(() => {
    fetch("/trails")
      .then((r) => r.json())
      .then(setTrails);
  }, []);


  // console.log(trails.id);
  return (
    <Card.Group>
      {trails.length > 0 ? (
        trails.map((trail) => (
          <Card key={trail.id} as={Link} to={`/trails/${trail.id}`} >
            
              <Header as={Link} to={`/trails/${trail.id}`}>{trail.name}</Header>
              <Card.Description>
                {trail.location}, {trail.state}<br />
                Length: {trail.distance} miles
              </Card.Description>
            
          </Card>
          
        ))
      ) : (
        <>
          <h2>No Trails Found</h2>
          {/* <Button as={Link} to="/new">
            Add a new Trail!
          </Button> */}
        </>
      )}
    </Card.Group>
  );
}


export default Trails;
