import React from "react";
import Message from "./Message";

const MessageList = ({ messages }) => {
  // const Message = ({ message }) => {
  //   console.log(message.role);
  //   console.log(message.content);
  // };
  return (
    <>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </>
  );
};

export default MessageList;
