import React, { useEffect } from "react";
import { useState } from "react";
import EmptyState from "./ChatBody/EmptyState";
import MessageList from "./ChatBody/MessageList";
const ChatBody = ({ message }) => {
  const [messages, setMessages] = useState([]);
  useEffect(() =>{
    if (message && message.content){
      const new_message = {
        id: messages.length + 1, 
        role: message.role || "user",
        content: message.content,
      };
      setMessages((prevMessages) => [...prevMessages, new_message]);    }
  },[message]);
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <EmptyState />
      </div>
    );
  } else {
    return (
      <div className="overflow-auto h-[80%]">
        <MessageList messages={messages} />
      </div>
    );
  }
};

export default ChatBody;
