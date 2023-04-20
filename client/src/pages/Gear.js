import React, { useEffect, useState } from "react";
import { Grid, Image, Header, Card } from 'semantic-ui-react'


function Gear({item, description}) {
    return (
        <Card className="GearCard" style={{width: "400px", padding: "10px"}}>
        {/* <Image src={imageUrl} wrapped ui={false} /> */}
        <Card.Content textAlign = "center">
          <Header>{item}</Header>
          <Card.Description >
            <p>{description}</p>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
  
export default Gear;
