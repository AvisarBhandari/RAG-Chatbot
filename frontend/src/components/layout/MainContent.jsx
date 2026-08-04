import React, { useState } from "react";
import ChatHeader from "./chat/ChatHeader";
import ChatInput from "./chat/ChatInput";
import ChatBody from "./chat/ChatBody";
const MainContent = ({ message }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setloading] = useState(false);
  const handleSend = (rawText) => {
    const new_message = {
      id: messages.length + 1,
      role: "user",
      content: rawText.trim(),
    };
    setloading(true);
    setMessages((prevMessages) => [...prevMessages, new_message]);
    addAssistantMessage("Hello Human!!");
  };
  // for test
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const addAssistantMessage = async (msg) => {
    await sleep(3000);
    const new_message = {
      id: Date.now(),
      role: "assistant",
      content: msg,
    };
    setloading(false);
    setMessages((prevMessages) => [...prevMessages, new_message]);
  };

  return (
    <div className=" flex flex-col h-screen grow bg-base-100 w-min-full">
      <ChatHeader />
      <ChatBody messages={messages} loading={loading} />
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default MainContent;
