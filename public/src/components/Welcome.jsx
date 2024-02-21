import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

// Welcome
const Welcome = ({ currentUser }) => {
  return (
    <Container>
      <img src={Robot} alt="Welcome" />
      <h1>
        Welcome, <span>{currentUser?.username}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  gap: 1ch;
  img {
    height: 20rem;
  }

  span {
    text-transform: uppercase;
    color: pink;
  }
`;

export default Welcome;
