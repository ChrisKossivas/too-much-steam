import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "./contexts/UserProvider";

import io from "socket.io-client";

// connect to server which is hosting socket
const socket = io("http://localhost:8000", {
  transports: ["websocket", "polling"],
});

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  const { user, userStatus } = useContext(UserContext);

  if (user.personaname !== undefined && userStatus) {
    socket.emit("username", user.personaname);
  }

  // UseEffect for each socket that is listening
  useEffect(() => {
    
    // on mount will connect user to socket
    socket.on("connect", () => {});

    // when a user sends a message the response from the socket will add the message to state
    socket.on("new-message", (msgObj) => {
      setMessages((messages) => [
        ...messages,
        { text: msgObj.text, avatar: msgObj.avatar },
      ]);
    });

    // disconnect user
    socket.on("disconnected", (id) => {
      console.log("DISCONNECTED!", id);
    });
  }, []);

  // Add message to state from socket
  socket.on("send", function (msg) {
    setMessages([...messages, msg]);
  });

  // submit Function to send message to socket
  const submit = (ev) => {
    ev.preventDefault();
    socket.emit("send", {
      value: value,
      username: user.personaname,
      avatar: user.avatarmedium,
    });
    setValue("");
  };

  // render chat
  return (
    <Wrapper>
      {messages.map((chatLog, index) => {
        return (
          <MessageContainer key={index}>
            <Message>
              <img src={chatLog.avatar} alt={"avatar"} />
              {chatLog.text}
            </Message>
          </MessageContainer>
        );
      })}
      <InputInfo>
        <ChatBox
          type="text"
          value={value}
          onChange={(eventSetValue) => setValue(eventSetValue.target.value)}
        />
        <SubmitMsg type="submit" onClick={(ev) => submit(ev)}>
          Submit
        </SubmitMsg>
      </InputInfo>
    </Wrapper>
  );
};

//styling
const SubmitMsg = styled.button`
  font-size: 15px;
  width: 100%;
  height: 40px;
  background: hotpink;
  color: white;
`;

const InputInfo = styled.div``;

const Wrapper = styled.form`
  position: fixed;
  bottom: 0;
`;

const ChatBox = styled.input`
  width: 93%;
`;
const MessageContainer = styled.ul`
  border: 1px solid #999;
  display: block;
`;

const Message = styled.li``;

export default Chat;
