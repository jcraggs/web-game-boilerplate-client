import React from "react";
import "./ShareLinkPopup.css";

const ShareLinkPopup = ({ dismissPopup, clickedShareBool }) => {
  return (
    <div className="shareLinkPopUpOuterContainer">
      <div
        className={clickedShareBool ? "shareLinkPopUpContainer" : "hiddenPopUp"}
        onClick={() => {
          dismissPopup();
        }}
      >
        <div className="shareLinkPopUpContents">
          <div class="popUpContentsDecorator">&nbsp;</div>
          <p class="popUpContentsText">Copied to Clipboard!</p>
        </div>
      </div>
    </div>
  );
};

export default ShareLinkPopup;
