import React from "react";

import "./ChatInput.css";

const ChatInput = ({ message, setMessage, sendMessage, chatboxBool }) => (
  <form className={chatboxBool === true ? "hide" : "form"} autoComplete="off">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
      autoComplete="off"
    ></input>
    <button className="sendButton" onClick={(event) => sendMessage(event)}>
      Send
    </button>
  </form>
);

export default ChatInput;
