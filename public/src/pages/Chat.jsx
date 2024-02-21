import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

// Chat
const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  // fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!localStorage.getItem(process.env.USER))
        return navigate("/login");
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.USER)
        )
      );
    };

    fetchCurrentUser();
  }, []);  

  // Socket.io add user
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  // Fetch all users
  useEffect(() => {
    const fetchAllUsers = async () => {
      if (currentUser) {
        if (!currentUser.isAvatarImageSet) return navigate("/setAvatar");
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      }
    };

    fetchAllUsers();
  }, [currentUser]);  

  // handle chat change
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        {/* Contacts */}
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {/* check If no chat is selected */}
        {currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </Container>
  );
};



// Styled Components
const Container = styled.div`

@keyframes color {
  0%   { background: #122D42; }
  20%  { background: #525D68; }
  40%  { background: #516587; }
  60%  { background: #64B2AF; }
  80%  { background: #84A0D1; }
  100% { background: #122D42; }
}
  background: #122D42; /* Fallback */
  animation: color 9s infinite linear;
  text-align: center;
  padding: 2em;

h1 {
  text-align: center;
  font-family: 'Kavoon', sans-serif;
  font-size: 2.5em;
  color: white;
}


  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: rgba(222, 222, 222, 0.1);
    display: grid;
    grid-template-columns: 25% 75%;
    border-radius: 2rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
