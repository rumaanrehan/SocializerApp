import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";

// Logout
const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear(); //clear local storage
    navigate("/login"); // redirect to login
  };

  return (
    <Button onClick={handleClick} title="Logout">
      <BiPowerOff />
    </Button>
  );
};

// Styled Components
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: rgba(31, 71, 132, 0.902);
  border: none;
  cursor: pointer;

  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

export default Logout;
