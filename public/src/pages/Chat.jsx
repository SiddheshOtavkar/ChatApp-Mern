import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";

// import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import { allUsersRoute, host } from "../utils/APIRoute";
// import Welcome from "../components/Welcome";

const Chat = () => {

    const navigate = useNavigate();
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!localStorage.getItem(import.meta.env.VITE_APP_LOCALHOST_KEY)) {
                    navigate("/login");
                } else {
                    const userData = await JSON.parse(localStorage.getItem(import.meta.env.VITE_APP_LOCALHOST_KEY));
                    setCurrentUser(userData);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (currentUser) {
                    if (currentUser.isAvatarImageSet) {
                        const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                        // console.log(response.data.users);
                        setContacts(response.data.users);
                    } else {
                        navigate("/setAvatar");
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, [currentUser]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };

    // useEffect(() => {
    //     if (currentUser) {
    //         socket.current = io(host);
    //         socket.current.emit("add-user", currentUser._id);
    //     }
    // }, [currentUser]);

    return (
        <>
            <Container>
                <div className="container">
                    <Contacts contacts={contacts} changeChat={handleChatChange} />
                    {/* {currentChat === undefined ? (
                        <Welcome />
                    ) : (
                        <ChatContainer currentChat={currentChat} socket={socket} />
                    )} */}
                    Chat
                </div>
            </Container>
        </>
    )
}

export default Chat;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;