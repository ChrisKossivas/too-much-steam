import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

// import { UserContext } from "./contexts/UserProvider";

import io from "socket.io-client";

const Chat = () => {
  // const socket = io("http://localhost:8000");
  console.log("ioo!", io)

  // console.log(socket)

  // useEffect(() => {
  //   socket.on("new-remote", ({editorId, ops}: {editorId: string, ops: string }) => {

  //   })
  //   socket.on("new-remote")
  // })

  const [messages, setMessages] = useState(["grf", "gredg"]);
  const [value, setValue] = useState("")

  console.log(value)

  const updateMessage = () => {
    console.log("submmitted!")
    setMessages([...messages, value])
    setValue("")
  }

  return (
    <div>
      chat
      {messages.map((eachMessage) => {
        console.log(eachMessage);
        return (
          <div key={eachMessage}>
        <p>
          {eachMessage}
        </p>
        </div>
          );
      })}
      <div>
        <input 
        type="text" 
        value = {value}
        onChange={(eventSetValue) => setValue(eventSetValue.target.value)}
        />
        <button type="submit" onClick={() => updateMessage()}>Submit</button>
      </div>
    </div>
  );
};

export default Chat;
