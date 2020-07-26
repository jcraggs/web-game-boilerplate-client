import React from "react";
import "./Game.css";
import ReadyPlayers from "./ReadyPlayers/ReadyPlayers";

const Game = ({
  users,
  name,
  readyPlayer,
  chatboxBool,
  startGame,
  gameData,
  room,
}) => {
  return (
    <div className={chatboxBool ? "gameContainerLarge" : "gameContainer"}>
      {users ? (
        <div className="gameboxContent">
          {gameData.gameStarted !== true ? (
            <ReadyPlayers
              users={users}
              name={name}
              readyPlayer={readyPlayer}
              startGame={startGame}
              room={room}
              gameData={gameData}
            ></ReadyPlayers>
          ) : (
            <p style={{ margin: "10px" }}>
              Game started: put your actual game component here
            </p>
          )}
        </div>
      ) : (
        <div className="activeContainer">
          <p className="noPlayers"> Server error: No users found</p>
        </div>
      )}
    </div>
  );
};

export default Game;
