import React from "react";
import "./ControlList.css";

const ControlList = () => {
  return (
    <div className="controlListContainer">
      <div className="actionList">
        <h1>Actions</h1>
        <ul>
          <li>Forward</li>
          <li>Backwards</li>
          <li>Left</li>
          <li>Right</li>
        </ul>
      </div>
      <div className="keyList">
        <h1>Keys</h1>
        <ul>
          <li>W</li>
          <li>S</li>
          <li>A</li>
          <li>D</li>
        </ul>
      </div>
    </div>
  );
};

export default ControlList;
