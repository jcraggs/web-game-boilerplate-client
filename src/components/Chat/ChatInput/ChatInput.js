import React from "react";

import "./ChatInput.css";

const ChatInput = ({ message, setMessage, sendMessage, chatboxBool }) => {
  const increasePaddingForKeyboardInput = () => {
    window.onresize = () => {
      document.getElementsByClassName(
        "mainInnerContainer"
      )[0].style.paddingBottom = "50px";
    };
  };

  const reducePaddingOnBlur = () => {
    window.onresize = () => {
      document.getElementsByClassName(
        "mainInnerContainer"
      )[0].style.paddingBottom = "30px";
    };
  };

  return (
    <form className={chatboxBool === true ? "hide" : "form"} autoComplete="off">
      <input
        className="input"
        id="chatInput"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
        onFocus={() => {
          increasePaddingForKeyboardInput();
        }}
        onBlur={() => {
          reducePaddingOnBlur();
        }}
        autoComplete="off"
      ></input>
      <button className="sendButton" onClick={(event) => sendMessage(event)}>
        Send
      </button>
    </form>
  );
};

export default ChatInput;
