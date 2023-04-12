import React, { useEffect, useState } from "react";
import { Grid, Header } from 'semantic-ui-react'


function Review({title, review_text, rating, user}) {
    return (
        <Grid columns = 'equal'>
        <Grid.Column  >
            <Header>{title}</Header>
            <p>{user}</p>
            <p>{rating}</p>
        </Grid.Column>
        <Grid.Column centered verticalAlign = "middle" style={{ paddingRight: '300px' }}  >     
            <p>{review_text}</p>
        </Grid.Column>
        </Grid>
    );
  }
  
export default Review;
