


import React, { useEffect, useState } from "react";
import Gear from "../pages/Gear"
import {Card} from "semantic-ui-react";

function GearPage({gears}){
    console.log(gears)
    const gear = gears?.length > 0 && gears.map((gear) => {

        return (
            
            <Gear
                item = {gear.item}
                description = {gear.description}
            />
        );
    });
    // console.log(gear)
    return (
    // <Card.Group itemsPerRow={4}>
    //   <h1></h1>
    // </Card.Group>
    <div>
      {gear}
    </div>
    )
}

export default GearPage;