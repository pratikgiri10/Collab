import React, { createContext } from 'react'
export const ChatProvider = createContext();
const ChatContext = ({children}) => {
    
  return (
    <div>{children}</div>
  )
}

export default ChatContext