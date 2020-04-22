import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./MessageList.css";

import Message from "./Message/Message";

const MessageList = ({ messages, name, chatboxBool }) => {
  return (
    <ScrollToBottom className={chatboxBool === true ? "hide" : "messages"}>
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default MessageList;
