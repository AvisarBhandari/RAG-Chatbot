import React, { useState } from 'react'
import ChatHeader from './chat/ChatHeader'
import ChatInput from './chat/ChatInput'
import ChatBody from './chat/ChatBody'
const MainContent  = () => {
  const[message, setmessage] = useState()
  const handleDataTransform = (rawText) => {
    const new_message = {
      role: "user",
      content: rawText.trim(),
    };
    setmessage(new_message);
  };
  return (
    <div className=" flex flex-col h-screen grow bg-base-100">
      <ChatHeader />
      <ChatBody message={message} />
      <ChatInput onSend={handleDataTransform}/>
    </div>
  );
}

export default MainContent 