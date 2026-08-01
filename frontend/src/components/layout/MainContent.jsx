import React from 'react'
import ChatHeader from './chat/ChatHeader'
import ChatInput from './chat/ChatInput'
import ChatBody from './chat/ChatBody'
const MainContent  = () => {
  return (
            <div className=" flex flex-col h-screen grow bg-base-100">
            <ChatHeader />
            <ChatBody />
            <ChatInput />
        </div>
  );
}

export default MainContent 