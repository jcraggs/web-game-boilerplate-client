import React from "react";
import closeIcon from "../../../icons/closeIcon.png";
import openIcon from "../../../icons/openIcon.png";
import onlineIcon from "../../../icons/onlineIcon.png";
import offlineIcon from "../../../icons/offlineIcon.png";
import "./InfoBar.css";

const userList = (users) => {
  const userList = [];
  if (users) {
    users.forEach((item) => {
      userList.push(item.name);
    });
  }
  return userList.join(", ");
};

const InfoBar = ({ room, users, chatboxBool, dropChat }) => (
  <div className={chatboxBool ? "infoBarRound" : "infoBar"}>
    <div className="leftInnerContainer">
      <img
        className="onlineIcon"
        src={users ? onlineIcon : offlineIcon}
        alt="online status"
      />
      <h3 className="roomTitle">Players: {userList(users)}</h3>
    </div>
    <div className="rightInnerContainer">
      <img
        className="exitButton"
        src={chatboxBool ? openIcon : closeIcon}
        alt="close chat"
        onClick={() => dropChat(chatboxBool)}
      />
    </div>
  </div>
);

export default InfoBar;