import React from "react";
import { Container, Image, Header, Card } from 'semantic-ui-react'


function Home() {
    return (
        <div>
            <Container fluid >
                <Header textAlign='center' size="large">Welcome to GreenSpace</Header>
                <div textAlign="left">
                <Header sub textAlign='center'>
                    Welcome to GreenSpace, the only site made by me where you can review Hikes you’ve gone on! <br/>
                    This is a work in progress so enjoy!
                </Header>
                <ul>Features coming soon:</ul>    
                <ul>-Map integration to visualize the trail</ul>
                <ul>-More Trails!</ul>    
                <ul>-A search function to find Trails when there are more to choose from</ul>    
                <ul>-A checklist to allow you to plan for your next hike</ul>     
                <ul>-Gear suggestions for each Hike</ul>    
                <ul>-Add more Gear options</ul>   
                <ul>-User pages to see all reviews and suggestions other hikers may have</ul>   
                </div>
            </Container>
        </div>
    );
  }
  
export default Home;
