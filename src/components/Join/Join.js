import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import "./Join.css";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [submitted, submitStatus] = useState(false);
  const [sharedRoom, setSharedRoom] = useState("");
  const currentURL = window.location.href;

  const getSharedRoom = (currentURL) => {
    let stringCheck = currentURL.includes("?sharedRoom=");
    if (stringCheck === true) {
      let splitURL = currentURL
        .split("/")
        .filter((str) => str.includes("?sharedRoom="))[0]
        .split("=")[1];
      return splitURL;
    } else return "";
  };

  useEffect(() => {
    document.body.style.position = "";
    let sharedRoomString = getSharedRoom(currentURL);
    if (sharedRoomString.length !== 0) {
      setSharedRoom(sharedRoomString.slice(0, 10));
      setRoom(sharedRoomString.slice(0, 10));
    }
  }, [sharedRoom, currentURL]);

  const submitform = (event) => {
    if (event.keyCode === 13 && name && room) {
      submitStatus(true);
    }
  };

  if (submitted === true) {
    return (
      <Redirect
        push
        to={{ pathname: "/game", search: `name=${name}&room=${room}` }}
      />
    );
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join the fun!</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => submitform(event)}
            autoComplete="off"
            maxLength="10"
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
            onKeyDown={(event) => submitform(event)}
            autoComplete="off"
            maxLength="10"
            defaultValue={sharedRoom}
            style={sharedRoom.length !== 0 ? { display: "none" } : {}}
          />
        </div>
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/game?name=${name}&room=${room}`}
        >
          <button className="button mt-20" type="submit">
            Let's go!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
