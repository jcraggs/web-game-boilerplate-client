import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import "./Join.css";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [submitted, submitStatus] = useState(false);

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
        <h1 className="heading">Join the fun</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => submitform(event)}
            autoComplete="off"
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
          />
        </div>
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/game?name=${name}&room=${room}`}
        >
          <button className="button mt-20" type="submit">
            Sign in
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
