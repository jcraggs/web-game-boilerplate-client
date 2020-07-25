import React from "react";
import "./ReturnToLobby.css";

const ReturnToLobby = ({ returnMessageBool, dismissPopup, returnMessage }) => {
  return (
    <div className="returnMessagePopUpOuterContainer">
      <div
        className={
          returnMessageBool ? "returnMessagePopUpContainer" : "hiddenPopUp"
        }
        onClick={() => {
          dismissPopup();
        }}
      >
        <div className="returnMessagePopUpContents">
          <div className="returnMessagePopUpContentsDecorator">&nbsp;</div>
          <p className="returnMessagePopUpContentsText">
            Returned to lobby: {returnMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnToLobby;
