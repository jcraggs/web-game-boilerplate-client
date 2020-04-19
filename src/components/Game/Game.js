import React from "react";
import gameIcon from "../../icons/gameIcon.png";
import "./Game.css";

const Game = () => (
  <div className="gameContainer">
    <img className="gameIcon" src={gameIcon} alt="game pad" />
    <h1>This is a placeholder component.</h1>
  </div>
);

export default Game;
