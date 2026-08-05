import React from "react";
import Message from "./Message";

const MessageList = ({ messages, loading }) => {
  // const Message = ({ message }) => {
  //   console.log(message.role);
  //   console.log(message.content);
  // };
  return (
    <>
      {messages.map((message) => (
        <Message key={message.id} message={message} loading={loading} />
      ))}
    {loading && (
        <div className="chat chat-start w-[80%]">
          <div className="chat-bubble">
            <div className="flex flex-row gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
              <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
              <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
            </div>
          </div>
        </div>
      )} 
    </>
    // <div>
    //   <Message />
    // </div>
  );
};

export default MessageList;
