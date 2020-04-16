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
      if (error) {
        // Handles users with the same name
        if (name && room) {
          const findNumbers = (nameArray, nameNum) => {
            let lastChar = nameArray.slice(-1).pop();

            if (isNaN(lastChar) === false) {
              nameNum.push(lastChar);
              let newArr = nameArray.splice(0, nameArray.length - 1);
              if (isNaN(newArr.slice(-1).pop()) === false) {
                return nameNum + findNumbers(newArr, nameNum);
              } else
                return (window.location.href = `/chat?name=${newArr.join("")}${(
                  Number(nameNum.reverse().join("")) + 1
                ).toString()}&room=${room}`);
            }
          };

          let nameLastChar = parseInt(name.split("").slice(-1).pop());
          if (isNaN(nameLastChar) === false) {
            let nameNum = [];
            const nameArr = name.split("");
            findNumbers(nameArr, nameNum);
          } else
            return (window.location.href = `/chat?name=${name}1&room=${room}`);
        }

        //Handles no name specified
        if (!name && room) {
          return (window.location.href = `/chat?name=guest&room=${room}`);
        }

        // Handles no room specified
        if (!room) {
          return (window.location.href = `/`);
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
