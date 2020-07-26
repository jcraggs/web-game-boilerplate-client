import React from "react";
import { Link } from "react-router-dom";
import "./RoomFull.css";

const RoomFull = () => {
  return (
    <div className="roomFullOuterContainer">
      <div
        className="roomFullShim"
        onClick={() => {
          return (window.location.href = `/`);
        }}
      >
        <div className="roomFullPopUp">
          <h1>Unable to join: room full or game in progress</h1>
          <Link to="/">
            <button className="button">Ok</button>
          </Link>
        </div>
      </div>
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Join the fun!</h1>
          <div>
            <input placeholder="Name" className="joinInput mt-20" type="text" />
          </div>
          <div>
            <input placeholder="Room" className="joinInput mt-20" type="text" />
          </div>
          <button className="button mt-20" type="submit">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomFull;
