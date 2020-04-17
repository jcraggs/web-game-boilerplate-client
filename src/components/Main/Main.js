import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import InfoBar from "../Chat/InfoBar/InfoBar";
import ChatInput from "../Chat/ChatInput/ChatInput";
import MessageList from "../Chat/MessageList/MessageList";
// import OnlineUsers from "../Chat/OnlineUsers/OnlineUsers";
import Game from "../Game/Game";
import NavBar from "../NavBar/NavBar";

import "./Main.css";

let socket;

const Main = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatboxBool, hideChat] = useState(false);
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
                return (window.location.href = `/game?name=${newArr.join("")}${(
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
            return (window.location.href = `/game?name=${name}1&room=${room}`);
        }

        //Handles no name specified
        if (!name && room) {
          return (window.location.href = `/game?name=guest&room=${room}`);
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

  const dropChat = (chatboxBool) => {
    hideChat(!chatboxBool);
  };

  return (
    <div className="mainOuterContainer">
      <NavBar />
      <div className="mainInnerContainer">
        <Game />
        <div className={chatboxBool ? "hidden" : "chatContainer"}>
          <InfoBar
            room={room}
            users={users}
            chatboxBool={chatboxBool}
            dropChat={dropChat}
          />
          <MessageList
            messages={messages}
            name={name}
            chatboxBool={chatboxBool}
          />
          <ChatInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            chatboxBool={chatboxBool}
          />
        </div>
        {/* <OnlineUsers users={users} /> */}
      </div>
    </div>
  );
};

export default Main;
