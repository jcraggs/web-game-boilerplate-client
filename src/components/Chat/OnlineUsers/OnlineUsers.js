import React from "react";

import onlineIcon from "../../../icons/onlineIcon.png";

import "./OnlineUsers.css";

const OnlineUsers = ({ users }) => (
  <div className="textContainer">
    {users ? (
      <div>
        <h1 className="onlineUsersTitle">People currently chatting:</h1>
        <div className="activeContainer">
          <h2 className="onlineUsersList">
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                {name}
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default OnlineUsers;
