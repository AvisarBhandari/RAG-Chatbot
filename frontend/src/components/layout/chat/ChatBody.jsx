import React, { useEffect } from "react";
import { useState } from "react";
import EmptyState from "./ChatBody/EmptyState";
import MessageList from "./ChatBody/MessageList";
const ChatBody = ({ messages, loading }) => {
  // console.log(loading);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <EmptyState />
      </div>
    );
  } else {
    return (
      <div className="overflow-auto h-[80%]">
        <MessageList  messages={messages} loading={loading} />
      </div>
    );
  }
};

export default ChatBody;
