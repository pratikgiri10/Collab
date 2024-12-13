import React, { useEffect, useState } from 'react'
import {message,recvChat} from '../../services/Chat/chatService'

const ChatRoom = () => {
  const [msgInput, setMsgInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [recvMsg, setRecvMsg] = useState([]);
  
  const sendMessage = () => {
    setMessages((prev) => [...prev,msgInput]);
    message(msgInput)
    setMsgInput('');
    
  }
  const recvMessage = (msg) => {
    console.log("recv msg: ",msg.content)
    setRecvMsg([...recvMsg,msg.content]);
  }
  useEffect(() => {
    recvChat(recvMessage);
    
  },[])
  return (
    <div className='text-white flex p-8 h-screen w-1/3'>
      <div className='bg-zinc-800 w-full p-4 rounded-xl flex flex-col justify-end gap-6'>
        <div className='text-xl flex flex-col gap-4'>
          {messages.map((msg,idx) => {
            return <div key={idx} className='flex justify-end' >
             <p className='bg-[#044c69] px-4 py-1 rounded'>{msg}</p>
            </div>
          })}
          {recvMsg.map((msg,idx) => {
            return <div key={idx} className='flex justify-end' >
             <p className='bg-[#044c69] px-4 py-1 rounded'>{msg}</p>
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