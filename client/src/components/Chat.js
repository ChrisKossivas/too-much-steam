import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { UserContext } from "./contexts/UserProvider";

import io from "socket.io-client";

const socket = io("http://localhost:8000", {
  transports: ["websocket", "polling"]
});


const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("")
  // const [chatUsers, setChatUsers] = useState([])
  // const [chatAvatar, setChatAvatar] = useState([])

  const {
    user,
    userStatus,
  } = useContext(UserContext);
  
  if (user.personaname !== undefined && userStatus) {
    socket.emit("username", user.personaname);
  }


  useEffect(() => {
    socket.on('connect', () => {
      
      })
      
      

    socket.on("new-message", msgObj => {
      setMessages(messages => [...messages, {text: msgObj.text, avatar: msgObj.avatar}])
    })
    

    socket.on("disconnected", id => {
      console.log("DISCONNECTED!", id)
    })

  }, [])

  // console.log(socket)

  console.log("react msggsgs",messages)


  socket.on('send', function(msg) {
    console.log("msssgg", msg)
    setMessages([...messages, msg])
    
  })

  const submit = ev => {
    ev.preventDefault();
    socket.emit("send", {value: value, username: user.personaname, avatar: user.avatarmedium})
    setValue("")
  }

  return (
    <Wrapper>
      chat
      {messages.map((chatLog, index) => {
        return (
          <MessageContainer key={index}>
        <Message>
          <img  src={chatLog.avatar} alt={"avatar"}/>
          {chatLog.text}
        </Message>
        </MessageContainer>
          );
      })}
      <InputInfo>
        <ChatBox 
        type="text" 
        value = {value}
        onChange={(eventSetValue) => setValue(eventSetValue.target.value)}
        />
        <SubmitMsg type="submit" onClick={(ev) => submit(ev)}>Submit</SubmitMsg>
      </InputInfo>
    </Wrapper>
  );
};

const SubmitMsg = styled.button`
font-size: 15px;
width: 85px;
height: 40px;

`

const InputInfo = styled.div`

`

const Wrapper = styled.form`
position: fixed;
bottom: 0;


`

const ChatBox = styled.input`
width: 250px;
height: 35px;

`
const MessageContainer = styled.ul`

border: 1px solid #999;
  display: block;
  position: relative;

`

const Message = styled.li`


`

export default Chat;
