import React from "react";
import onlineIcon from "../../../../icons/onlineIcon.png";
import offlineIcon from "../../../../icons/offlineIcon.png";
import "./OnlineUsers.css";

const OnlineUsers = ({ users }) => {
  return (
    <div>
      {users ? (
        <div className="activeContainer">
          <h2 className="onlineUsersList">
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                <img alt="Online Icon" src={onlineIcon} />
                {name}
              </div>
            ))}
          </h2>
        </div>
      ) : (
        <div className="activeContainer">
          <img className="offlineImg" alt="Offline Icon" src={offlineIcon} />
          <p className="noPlayers"> Server error: No users found</p>
        </div>
      )}
    </div>
  );
};

export default OnlineUsers;
