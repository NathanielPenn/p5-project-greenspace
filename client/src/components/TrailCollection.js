import React from "react";
// import {Link} from 'react-router-dom';
import TrailCard from "./TrailCard";
import {Card} from "semantic-ui-react";

// COLLECT ALL PROJECTS OR DO A  FETCH TO SPECIFY TO USER


function TrailCollection({trails}){
    // console.log(trails)
  const trailCards = trails?.length > 0 && trails.map((trail)=> {
      
      console.log(trails)

      return (
      <TrailCard
        // name = {trail.name}
        // location ={trail.location}     
        // state = {trail.state}
        // distance = {trail.distance}
        // elevation = {trail.elevation}
        // difficulty = {trail.difficulty}
      />
    );
  });

  
  return (
    <Card.Group itemsPerRow={3}>
      {trailCards}
    </Card.Group>
  )



}

export default TrailCollection;