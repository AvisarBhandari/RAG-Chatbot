import React from 'react'
import ThemeController from '../ThemeController'
const ChatHeader = () => {
  return (
    <div className="flex flex-row justify-between items-center h-16 px-4 ">
      <div></div>
      <div className="font-bold flex justify-center">CHAT TITLE</div>
      <div className="flex items-center space-x-2">

      <ThemeController />
      </div>
    </div>
  )
}

export default ChatHeader