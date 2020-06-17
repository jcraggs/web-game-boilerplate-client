import React from "react";
import "./ReadyPlayers.css";

const ReadyPlayers = ({ users, name, readyPlayer, startGame }) => {
  let localPlayer = {};
  let everybodyReady = false;
  let openSlots = users[0].roomSizeLimit - users.length;
  let openSlotsArr = [];

  const createOpenSlotsDiv = (openSlotsArr, openSlots) => {
    for (let i = 0; i < openSlots; i++) {
      openSlotsArr.push(i);
    }
    return openSlotsArr;
  };

  let divCountForSlots = createOpenSlotsDiv(openSlotsArr, openSlots);

  if (users) {
    let totalUsers = users.length;
    let readyUsers = 0;

    users.forEach((user) => {
      if (user.ready === true) {
        readyUsers += 1;
      } else readyUsers += -1;
    });
    if (totalUsers === readyUsers) {
      everybodyReady = true;
    }
  }

  if (users) {
    users.forEach((user) => {
      if (user.name === name) return (localPlayer = user);
    });
  }

  return (
    <div className="readyUsersContainer">
      <p className="gameLobbyTitle">
        {" "}
        {users[0].name.charAt(0).toUpperCase() + users[0].name.slice(1)}'s lobby
      </p>
      <div className="readyUserInnerContainer">
        <div className="readyUsersList">
          {users.map((user) => (
            <div key={user.name} className="playerName">
              <div
                className="readyIndicator"
                style={
                  user.ready === true
                    ? { backgroundColor: "#69F0AE" }
                    : { backgroundColor: "red" }
                }
              ></div>
              {users[0].name === user.name ? (
                <p
                  className="playerNameText"
                  style={
                    user.name === localPlayer.name
                      ? { color: "yellow" }
                      : { color: "" }
                  }
                >
                  {user.name} (host)
                </p>
              ) : (
                <p
                  className="playerNameText"
                  style={
                    user.name === localPlayer.name
                      ? { color: "yellow" }
                      : { color: "" }
                  }
                >
                  {user.name}
                </p>
              )}
            </div>
          ))}

          {divCountForSlots.map((x) => (
            <div className="playerName" key={x}>
              <div className="readyIndicator"></div>
              <p className="openSlot">Open slot</p>
            </div>
          ))}
        </div>
        <div className="readyUserButtons">
          <div style={{ width: "100%" }}>
            <button
              className="readyButton"
              onClick={(event) => {
                readyPlayer(event, name);
              }}
            >
              {localPlayer.ready === true ? "Unready" : "Ready"}
            </button>
          </div>
          {users[0].name === localPlayer.name ? (
            <div style={{ width: "100%" }}>
              {everybodyReady === true ? (
                <button
                  className="startButton"
                  disabled={!everybodyReady}
                  onClick={(event) => {
                    startGame(event);
                  }}
                >
                  Click here to start game
                </button>
              ) : (
                <p className="waitingMessage">
                  Waiting for everyone to ready...
                </p>
              )}
            </div>
          ) : (
            <div
              style={localPlayer.ready === true ? {} : { visibility: "hidden" }}
            >
              <p className="waitingMessage">Waiting for host to start...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadyPlayers;
