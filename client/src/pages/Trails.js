import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function TrailList() {
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    fetch("/trails")
      .then((r) => r.json())
      .then(setTrails);
  }, []);

  return (
    <Wrapper>
      {trails.length > 0 ? (
        trails.map((trail) => (
          <Trail key={trail.id}>
            <Box>
              {/* <h2>{trail.title}</h2>
              <p>
                <em>Time to Complete: {trail.minutes_to_complete} minutes</em>
                &nbsp;·&nbsp;
                <cite>By {trail.user.username}</cite>
              </p>
              <ReactMarkdown>{trail.instructions}</ReactMarkdown> */}
            </Box>
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
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Trail = styled.article`
  margin-bottom: 24px;
`;

export default TrailList;
