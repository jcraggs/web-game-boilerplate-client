import React, { useState } from "react";
import "./ReadyPlayers.css";
import share from "../../../icons/share.png";
import ShareLinkPopup from "./ShareLinkPopup/ShareLinkPopup";
import ReturnToLobby from "./ReturnToLobby/ReturnToLobby";

const ReadyPlayers = ({
  users,
  name,
  readyPlayer,
  startGame,
  room,
  gameData,
}) => {
  let localPlayer = {};
  let everybodyReady = false;
  let openSlots = users[0].roomSizeLimit - users.length;
  let openSlotsArr = [];
  const [clickedShareBool, showSharePopup] = useState(false);
  const [returnMessageBool, showReturnMessage] = useState(true);

  const showPopup = () => {
    showSharePopup(true);
    setTimeout(function () {
      showSharePopup(false);
    }, 3000);
  };

  const dismissPopup = () => {
    showSharePopup(false);
    showReturnMessage(false);
  };

  const createOpenSlotsDiv = (openSlotsArr, openSlots) => {
    for (let i = 0; i < openSlots; i++) {
      openSlotsArr.push(i);
    }
    return openSlotsArr;
  };

  const getShareableLink = (room) => {
    showPopup();
    const currentURL = window.location.href;
    let splitURL = currentURL.split("/game?")[0];
    let shareableLink = splitURL + `/?sharedRoom=${room}`;
    if (shareableLink !== undefined) {
      return shareableLink;
    } else return null;
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
      if (user.name === name.toLowerCase()) return (localPlayer = user);
    });
  }

  return (
    <div className="readyUsersContainer">
      <p className="gameLobbyTitle">
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
              {everybodyReady === true && users.length > 1 ? (
                <button
                  className="startButton"
                  disabled={!everybodyReady}
                  onClick={(event) => {
                    startGame(event);
                  }}
                >
                  Start game
                </button>
              ) : (
                <div style={{ height: "65px", width: "100px" }}></div>
              )}
            </div>
          ) : (
            <div
              style={localPlayer.ready === true ? {} : { visibility: "hidden" }}
            >
              <div style={{ height: "65px", width: "100px" }}></div>
            </div>
          )}
        </div>
      </div>

      <div className="lobbyWaitingStatus">
        {users.length <= 1 ? (
          <p className="waitingMessage">Waiting for players to join...</p>
        ) : null}
        {everybodyReady === true && users.length > 1 ? (
          <p className="waitingMessage">Waiting for host to start...</p>
        ) : null}
        {everybodyReady !== true && users.length > 1 ? (
          <p className="waitingMessage">Waiting for everyone to ready...</p>
        ) : null}
      </div>

      <button
        className="shareLinkButton"
        // note writeText only works over HTTPS or localhost
        onClick={() => navigator?.clipboard?.writeText(getShareableLink(room))}
      >
        <div className="shareLinkContents">
          <img className="shareLinkIcon" src={share} alt="share room link" />
          <p className="shareLinkButtonText">Invite friends!</p>
        </div>
      </button>

      <ShareLinkPopup
        dismissPopup={dismissPopup}
        clickedShareBool={clickedShareBool}
      />
      {gameData.returnReason ? (
        <div>
          <div
            className={returnMessageBool ? "shimContainer" : null}
            onClick={() => dismissPopup()}
          ></div>
          <ReturnToLobby
            returnMessageBool={returnMessageBool}
            dismissPopup={dismissPopup}
            returnMessage={gameData.returnReason}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ReadyPlayers;
