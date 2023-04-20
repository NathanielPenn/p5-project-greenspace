import React, {useContext} from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
// import { Button } from "../styles";
import {UserContext} from "./App";
import {  Header, Button } from "semantic-ui-react";

function NavBar() {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }
  const[user, setUser] = useContext(UserContext)

  return (
    <div className="NavBar">
      <Header className="HeaderLogo"  size='huge'textAlign='center'>
        <NavLink className="HomeButton" to="/">GreenSpace</NavLink>
      <Header sub size="large">Welcome {user.username}</Header>
      </Header>
      <Button.Group active color= 'green' attached="bottom" >
        <Button  as={Link} to="/trails">
          Trails
        </Button>
        <Button  as={Link} to="/gear">
          Gear
        </Button>
        <Button  as={Link} to="/reviews">
          Reviews
        </Button>
        <Button  onClick={handleLogoutClick}>
          Logout
        </Button>
      </Button.Group>
    </div>
  );
}

// const Wrapper = styled.header`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 8px;
//   background-color: #373d207c 
// `;

// const Logo = styled.h1`
//   font-family: "Ariel";
//   font-size: 3rem;
//   color: green;
//   margin: 0;
//   line-height: 1;

//   a {
//     color: inherit;
//     text-decoration: none;
//   }
// `;

// const Nav = styled.nav`
//   display: flex;
//   gap: 4px;
//   position: absolute;
//   right: 8px;
// `;

export default NavBar;
