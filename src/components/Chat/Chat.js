import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import InfoBar from "../InfoBar/InfoBar";
import ChatInput from "../ChatInput/ChatInput";
import MessageList from "../MessageList/MessageList";
import OnlineUsers from "../OnlineUsers/OnlineUsers";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      //function to get last digit, if = num, let num +=1 then send
      // let newname = name, with trimmed digit, then plus 1

      //you also want to handle if user name and room arent defined
      // let nameLastChar = parseInt(name.split("").slice(-1).pop());

      // current function cant handle beyond 0-9 very well as it reads the last digit rather than checking if it is a longer number

      let newName = undefined;

      if (error) {
        let nameLastChar = parseInt(name.split("").slice(-1).pop());

        if (isNaN(nameLastChar) === false) {
          let nameArr = name.split("");
          let slicedName = nameArr.slice(0, nameArr.length - 1);
          let combinedName = [...slicedName, (nameLastChar += 1).toString()];
          let newName = combinedName.join("");
          return (window.location.href = `/chat?name=${newName}&room=${room}`);
        }

        if (newName === undefined) {
          return (window.location.href = `/chat?name=${name}1&room=${room}`);
        }
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((msgs) => [...msgs, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <MessageList messages={messages} name={name} />
        <ChatInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <OnlineUsers users={users} />
    </div>
  );
};

export default Chat;
