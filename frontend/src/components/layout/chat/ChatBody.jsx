import React from "react";
import { useState } from "react";
import EmptyState from "./ChatBody/EmptyState";
import MessageList from "./ChatBody/MessageList";
const ChatBody = ({role, content}) => {

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "user",
      content: "Hello!",
    },
    {
      id: 2,
      role: "assistant",
      content: "Hi! How can I help you?",
    },
    {
      id: 3,
      role: "user",
      content: "Explain React.",
    },
    {
      id: 4,
      role: "assistant",
      content: "React is a JavaScript library...",
    },
    {
      id: 1,
      role: "user",
      content: "Hello!",
    },
    {
      id: 2,
      role: "assistant",
      content: "Hi! How can I help you?",
    },
    {
      id: 3,
      role: "user",
      content: "Explain React.",
    },
    {
      id: 4,
      role: "assistant",
      content: "React is a JavaScript library...",
    },
    {
      id: 1,
      role: "user",
      content: "Hello!",
    },
    {
      id: 2,
      role: "assistant",
      content: "Hi! How can I help you?",
    },
    {
      id: 3,
      role: "user",
      content: "Explain React.",
    },
    {
      id: 4,
      role: "assistant",
      content: "React is a JavaScript library...",
    },
    {
      id: 1,
      role: "user",
      content: "Hello!",
    },
    {
      id: 2,
      role: "assistant",
      content: "Hi! How can I help you?",
    },
    {
      id: 3,
      role: "user",
      content: "Explain React.",
    },
    {
      id: 4,
      role: "assistant",
      content: "React is a JavaScript library...",
    },
    {
      id: 1,
      role: "user",
      content: "Hello!",
    },
    {
      id: 2,
      role: "assistant",
      content: "Hi! How can I help you?",
    },
    {
      id: 3,
      role: "user",
      content: "Explain React.",
    },
    {
      id: 4,
      role: "assistant",
      content: "React is a JavaScript library...",
    }
  ]);
  console.log("me = "+ messages)
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <EmptyState />
      </div>
    );
  } else {
    return <div className="overflow-auto h-[80%]">
      <MessageList messages={messages} />
      </div>
  }
};

export default ChatBody;
