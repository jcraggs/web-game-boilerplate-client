import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import InfoBar from "../Chat/InfoBar/InfoBar";
import ChatInput from "../Chat/ChatInput/ChatInput";
import MessageList from "../Chat/MessageList/MessageList";
import Game from "../Game/Game";
import NavBar from "../NavBar/NavBar";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import RoomFull from "../RoomFull/RoomFull";
import Loading from "../Loading/Loading";

import "./Main.css";

let socket;

const Main = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatboxBool, hideChat] = useState(true);
  const [burgerMenuBool, hideBurgerMenu] = useState(false);
  const [loading, setLoadingStatus] = useState(true); // Change to false to allow development on mobile when hosting server locally
  const [showContentBool, showContent] = useState(false); // Change to true to allow development on mobile when hosting server locally
  const [gameData, setGameData] = useState({});

  // Points at the back end:
  const ENDPOINT = "https://web-game-boilerplate.herokuapp.com/";
  // const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        // Redirects when names or rooms are >10 characters long, only possible with url manipulation
        if (error.status === 401) {
          setLoadingStatus(true);
          return (window.location.href = `/`);
        }

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
      socket.disconnect();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    document.body.style.position = "";
    socket.on("message", (message) => {
      setMessages((msgs) => [...msgs, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
    socket.on("roomFull", function () {
      setLoadingStatus(false);
      socket.disconnect();
    });
    socket.on("allowEntry", function (entryStatus) {
      setLoadingStatus(false);
      showContent(entryStatus);
    });
    socket.on("gameData", (gameDataObj) => {
      setGameData(gameDataObj);
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

  const toggleBurgerMenu = (burgerMenuBool) => {
    hideBurgerMenu(!burgerMenuBool);
    if (burgerMenuBool === false) {
      document.body.style.position = "fixed";
      return;
    } else document.body.style.position = "";
  };

  const readyPlayer = (event, name) => {
    event.preventDefault();
    socket.emit("readyPlayer", name, users);
  };

  const startGame = () => {
    socket.emit("startGame", { room });
  };

  if (loading !== true) {
    if (showContentBool) {
      return (
        <div className="mainOuterContainer">
          {burgerMenuBool === true ? <div className="coverShim"></div> : null}
          <NavBar
            burgerMenuBool={burgerMenuBool}
            toggleBurgerMenu={toggleBurgerMenu}
          />
          <div className="mainInnerContainer">
            <BurgerMenu
              burgerMenuBool={burgerMenuBool}
              toggleBurgerMenu={toggleBurgerMenu}
              users={users}
            />
            <Game
              users={users}
              name={name}
              readyPlayer={readyPlayer}
              chatboxBool={chatboxBool}
              startGame={startGame}
              gameData={gameData}
              room={room}
            />
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
          </div>
        </div>
      );
    } else return <RoomFull />;
  } else return <Loading />;
};

export default Main;
