import React from 'react'
import { useState } from 'react'
import EmptyState from './EmptyState'
const ChatBody = () => {
  const [messages, setMessages] = useState([]);
  if (messages.length === 0) {
    return <div className="flex flex-col items-center justify-center h-full">
      <EmptyState />
    </div>
  }
  else {
  return (
    <div>ChatBody</div>
  )
}}

export default ChatBody