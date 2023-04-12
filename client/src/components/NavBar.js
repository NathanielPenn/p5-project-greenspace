import React, {useContext} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";
import {UserContext} from "./App";

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
    <Wrapper>
      <Logo>
        <Link to="/">GreenSpace</Link>
      </Logo>
      <Nav>
        <Button as={Link} to="/trails">
          Trails
        </Button>
        <Button as={Link} to="/gear">
          Gear
        </Button>
        <Button as={Link} to="/reviews">
          Reviews
        </Button>
        <Button variant="outline" onClick={handleLogoutClick}>
          Logout
        </Button>
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const Logo = styled.h1`
  font-family: "Ariel";
  font-size: 3rem;
  color: green;
  margin: 0;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  right: 8px;
`;

export default NavBar;
