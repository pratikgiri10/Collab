import React, { useEffect, useRef, useState } from 'react'
import {message,recvChat} from '../../services/Chat/chatService'

const ChatRoom = () => {
  const [msgInput, setMsgInput] = useState('');
  const [recvMsg, setRecvMsg] = useState([]);

  const chatRef = useRef({});
  
  const sendMessage = () => {
    message(msgInput)
    setMsgInput('');
    
  }
  const recvMessage = (msg) => {
    console.log("recv msg: ",msg.content)
    setRecvMsg((prev) => [...prev, msg.content]);
    
  }
  useEffect(() => {
    recvChat(recvMessage);
    
  },[])
  useEffect(() => {
    if(chatRef.current){
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [recvMsg])
  
  return (
    <div className='text-white flex p-8 h-screen w-1/3'>
      <div className='bg-zinc-800 w-full p-4 rounded-xl flex flex-col justify-end gap-6'>
        <div id='scroll' ref={ chatRef } className='text-xl flex flex-col gap-4 overflow-y-auto'>
          {recvMsg.map((msg,idx) => {
            return <div key={idx} className='flex justify-end ' >
             <p className='bg-[#044c69] px-4 py-1 rounded mb-3'>{msg}</p>
            </div>
          })}           
         
         
          {/* <div className='flex justify-end' >
            <p className='bg-[#044c69] px-4 py-1 rounded'>hello k xa khabar</p>
          </div>
          <div className='flex justify-start' >
            <p className='bg-[#044c69] px-4 py-1 rounded max-w-48'>hello </p>
          </div> */}
            
        </div>
        <div className='flex '>
            <input
            value={msgInput}
            onChange={(e) => {
              setMsgInput(e.target.value);
            }} 
            className=' text-white bg-zinc-700 outline-none p-4 w-full' placeholder='write a message' type="text"/>
            <button
            onClick={sendMessage}
            className='bg-[#044c69] px-4 py-2'>Send</button>
        </div>
      </div>
       
    </div>
  )
}

export default ChatRoom