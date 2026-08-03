import React, { useState } from 'react'
import ChatHeader from './chat/ChatHeader'
import ChatInput from './chat/ChatInput'
import ChatBody from './chat/ChatBody'
const MainContent  = ({message}) => {
  const[messages, setMessages] = useState([])
  const [loading, setloading] = useState(false);
  const handleUserDateTransform = (rawText) => {
    const new_message = {
      id: messages.length + 1,
      role: "user",
      content: rawText.trim(),
    };
    setloading(true)
    setMessages((prevMessages) => [...prevMessages, new_message]);
    handleUserAssTransform()
  };
  // for test
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const handleUserAssTransform =async () => {
      await sleep(3000); 
      const new_message = {
        id: messages.length + 1,
        role: "assistant",
        content: "Hello, Human",
      };
      setloading(false);
      setMessages((prevMessages) => [...prevMessages, new_message]);
    };
  return (
    <div className=" flex flex-col h-screen grow bg-base-100">
      <ChatHeader />
      <ChatBody messages={messages} loading = {loading} />
      <ChatInput onSend={handleUserDateTransform} />
    </div>
  );
}

export default MainContent 