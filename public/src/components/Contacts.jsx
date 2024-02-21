import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import DefaultAvatar from "../assets/user-default.png";

// Contacts
const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [search, setSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  // Check if string is empty or contains whitespaces
  const isEmptyOrSpaces = (str) => {
    return /^\s*$/.test(str);
  };

  // Check current user
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  // Search Contacts Logic
  useEffect(() => {
    const re = RegExp(
      `.*${search.toLowerCase().replace(/\s+/g, "").split("").join(".*")}.*`
    );
    const searchResults = contacts.filter((v) =>
      v.username.toLowerCase().match(re)
    );

    setFilteredContacts(searchResults);
  }, [search]);

  // Change Current Chat
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  // Show each contacts
  const showContacts = (contact, key) => {
    return (
      <div
        className={`contact ${key === currentSelected ? "selected" : ""}`}
        key={key}
        onClick={() => changeCurrentChat(key, contact)}
      >
        {/* Avatar Image */}
        <div className="avatar">
          <img
            src={`${
              contact?.isAvatarImageSet
                ? `data:image/svg+xml;base64,${contact?.avatarImage}`
                : DefaultAvatar
            }`}
            alt={`Avatar ${key + 1}`}
          />
        </div>

        {/* Avatar Username */}
        <div className="username">
          <h3>{contact.username}</h3>
        </div>
      </div>
    );
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          {/* Brand Logo and Name */}
          <div className="brand">
            <img src={Logo} alt="socializer" />
            <h3>socializer</h3>
          </div>
          <div className="contacts">
            {/* Contacts Search */}
            <div className="contacts-search">
              <input
                type="text"
                placeholder="Search Contacts"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* Show Searched Contacts */}
            {isEmptyOrSpaces(search) ? (
              contacts.map((contact, i) => showContacts(contact, i))
            ) : filteredContacts.length > 0 ? (
              filteredContacts.map((contact, i) => showContacts(contact, i))
            ) : (
              <p>No Contacts Found.</p>
            )}
          </div>

          {/* Current User Info */}
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt={`${currentUserName}'s Avatar`}
              />
            </div>

            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

// Styled Components
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 79% 10%;
  overflow: hidden;
  background-color: #1c1c1c;
  // background-image:linear-gradient(0deg,white, #960233b5);
  border-top-left-radius: 2rem;
  border-bottom-left-radius: 2rem;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    cursor: pointer;

    img {
      height: 2rem;
    }

    h3 {
      color: #fff;
      font-size: larger;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;

    &::-webkit-scrollbar {
      width: 0.1rem;
      &-thumb {
        background-color: white;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    p {
      color: #fff;
    }

    .contacts-search {
      width: 90%;
      height: 2.5rem;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      gap: 2rem;
      background-color: rgba(255, 255, 255, 0.204);

      input {
        background-color: transparent;
        color: #ffff;
        border: none;
        padding-left: 1rem;
        font-size: 1.2rem;

        &::selection {
          background-color: white;
        }

        &:focus {
          outline: none;
        }
      }
    }

    .contact {
      opacity: 0.5;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.2s ease-in-out;

      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h3 {
          color: #fff;
        }
      }
    }
    .contact:hover {
      opacity: 1.0;
    }

    .selected {
      background-color: #b1b0b058;
      opacity: 1.0;
    }
  }

  .current-user {
    background-color: #1c1c1c;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    cursor: pointer;

    .avatar {
      img {
        height: 3rem;
        max-inline-size: 100%;
      }
    }

    .username {
      h2 {
        color: #fff;
      }
    }

    @media screen and (min-width: 50px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts;
