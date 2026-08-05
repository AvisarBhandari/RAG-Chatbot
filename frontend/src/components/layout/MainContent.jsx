import React, { useState } from "react";
import ChatHeader from "./chat/ChatHeader";
import ChatInput from "./chat/ChatInput";
import ChatBody from "./chat/ChatBody";
import axios from "axios";
import { streamChatbot } from "../../utility/streamChatbot";
const MainContent = () => {
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
    addAssistantMessage(rawText.trim());
  };

  // for test
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const addAssistantMessage = async (q) => {
    const assistantId = Date.now();
    const new_message = {
      id: assistantId,
      role: "assistant",
      content: " ",
    };
    setMessages((prevMessages) => [...prevMessages, new_message]);
    try {
      await streamChatbot(q, (newToken) => {
        setloading(false);
        // Find the specific assistant message by id to append tokens
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === assistantId
              ? { ...msg, content: msg.content + newToken }
              : msg,
          ),
        );
      });
    } catch (error) {
      setloading(false);

      console.log("Stream failed: ", error);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === assistantId
            ? { ...msg, content: "❌ Something went wrong. Please try again." }
            : msg,
        ),
      );
    }
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
