import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import { Grid, Header, Card } from 'semantic-ui-react'

function Trails() {
  const { id } = useParams();
  const [trails, setTrails] = useState([]);
  const [trail, setTrail] = useState(null);

  useEffect(() => {
    fetch("/trails")
      .then((r) => r.json())
      .then(setTrails);
  }, []);

  useEffect(() => {
    fetch(`/trails/${id}`)
      .then(response => response.json())
      .then(data => setTrail(data))
      .catch(error => console.error(error));
  }, [id]);

  // console.log(trail);
  return (
    <Card.Content>
      {trails.length > 0 ? (
        trails.map((trail) => (
          <Trail key={trail.id}>
            <div>
              <NavLink as={Link} to={`/trails/${trail.id}`}>{trail.name}</NavLink>
              <p>
                {trail.location}, {trail.state}<br />
                Length: {trail.distance} miles
              </p>
            </div>
          </Trail>
        ))
      ) : (
        <>
          <h2>No Trails Found</h2>
          {/* <Button as={Link} to="/new">
            Add a new Trail!
          </Button> */}
        </>
      )}
    </Card.Content>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Trail = styled.article`
  margin-bottom: 24px;
`;

export default Trails;
