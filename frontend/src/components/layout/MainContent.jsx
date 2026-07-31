import React from 'react'
import TheamController from '../ThemeController'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatBody from './ChatBody'
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