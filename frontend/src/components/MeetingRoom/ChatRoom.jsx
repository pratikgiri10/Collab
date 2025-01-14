import React, { useEffect, useRef, useState } from 'react'
import {message} from '../../services/Chat/chatService'
import { LuSendHorizontal } from "react-icons/lu";
const Chat = ({msg,userId, remoteUserId}) => {
  if(userId == remoteUserId){
    return <div className='flex justify-end ' >
      <p className='bg-[#044c69] px-4 py-1 rounded mb-3'>{msg}</p>
  </div>
  }
  else{
    return <div className='flex justify-start ' >
    <p className='bg-zinc-700 px-4 py-1 rounded mb-3'>{msg}</p>
</div>
  }
  
}
const ChatRoom = ({messages}) => {
  const [msgInput, setMsgInput] = useState('');
  // const [recvMsg, setRecvMsg] = useState([]);

  const chatRef = useRef({});
  
  const sendMessage = () => {
    message(msgInput)
    setMsgInput('');
    
  }
  
  // useEffect(() => {
  //   recvChat(recvMessage);
    
  // },[])
  useEffect(() => {
    if(chatRef.current){
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages])
  
  return (
    <div className='flex'>
      <div className='flex text-white p-8 h-screen w-[350px]'>       
        <div className='bg-zinc-800 w-full p-4 rounded-xl flex flex-col justify-end gap-6'>
          <div id='scroll' ref={ chatRef } className='text-xl flex flex-col gap-4 overflow-y-auto'>
            {messages.map((msg,index) => {
              return <Chat key={index} msg={msg.content} userId={msg.userId} remoteUserId={msg.remoteUserId}/>
            })}            
          </div>
          <div className='flex '>
              <input
              value={msgInput}
              onChange={(e) => {
                setMsgInput(e.target.value);
              }} 
              className=' text-white bg-zinc-700 outline-none p-2 lg:p-4 w-full' placeholder='write a message' type="text"/>
              <button
              onClick={sendMessage}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className='bg-[#044c69] px-4 py-2 flex items-center gap-1'>Send<LuSendHorizontal /></button>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default ChatRoom