import React from "react";
import closeIcon from "../../../icons/closeIcon.png";
import onlineIcon from "../../../icons/onlineIcon.png";
import "./InfoBar.css";

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online status" />
      <h3 className="roomTitle">Room: {room}</h3>
    </div>

    <div className="rightInnerContainer">
      <a href="/">
        <img className="exitButton" src={closeIcon} alt="close chat" />
      </a>
    </div>
  </div>
);

export default InfoBar;
