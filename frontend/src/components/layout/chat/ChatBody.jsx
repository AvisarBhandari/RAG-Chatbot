import React, { useEffect, useRef } from "react";
import { useState } from "react";
import EmptyState from "./ChatBody/EmptyState";
import MessageList from "./ChatBody/MessageList";
const ChatBody = ({ messages, loading }) => {
  const bottomOfPanelRef = useRef(null);
  // console.log(loading);
  const scrollIntoView = () => {
    bottomOfPanelRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollIntoView();
  }, [messages]);
  if (messages.length === 0) {
    return <EmptyState />;
  } else {
    return (
      <div className="overflow-auto h-[80%]">
        <MessageList messages={messages} loading={loading} />
        <div ref={bottomOfPanelRef}></div>
      </div>
    );
  }
};

export default ChatBody;
