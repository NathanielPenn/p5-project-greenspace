import React, { useEffect, useState } from "react";
import { Grid, Image, Header } from 'semantic-ui-react'


function Gear({item, description}) {
    return (
        <Grid columns = 'equal'>
        <Grid.Column  >
            {/* <Image centered bordered size = 'medium' src={} /> */}
            
        </Grid.Column>
        <Grid.Column centered verticalAlign = "middle" style={{ paddingRight: '300px' }}  >
            <Header>{item}</Header>
            
            <p>{description}</p>
        </Grid.Column>
        </Grid>
    );
  }
  
export default Gear;
