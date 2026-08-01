import React from 'react'
import ThemeController from '../../ThemeController'
const ChatHeader = () => {
  return (
    <div className="flex flex-row justify-between items-center h-16 px-4 border-b border-base-300 bg-base-300">
      <div></div>
      <div className="font-bold flex justify-center">Simple AI Chat</div>
      <div className="flex items-center space-x-2">
        <ThemeController />
      </div>
    </div>
  );
}

export default ChatHeader