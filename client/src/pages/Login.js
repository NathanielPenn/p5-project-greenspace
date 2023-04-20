import { useState } from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { Button } from "../styles";
import {Card} from "semantic-ui-react"

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Card id='LoginPage'>
    <Wrapper >
      <Logo>GreenSpace</Logo>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <Divider />
          <p>
            Don't have an account? &nbsp;
            <Button color="primary" onClick={() => setShowLogin(false)}>
              Sign Up
            </Button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <Divider />
          <p>
            Already have an account? &nbsp;
            <Button color="primary" onClick={() => setShowLogin(true)}>
              Log In
            </Button>
          </p>
        </>
      )}
    </Wrapper>
    </Card>
  );
}

const Logo = styled.h1`
  font-family: "Ariel", cursive;
  font-size: 3rem;
  color: darkgreen;
  margin: 8px 0 16px;
`;

const Wrapper = styled.section`
  font-family: Futura, sans-serif;
  max-width: 500px;
  margin: 40px auto;
  padding: 16px;
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;

export default Login;
