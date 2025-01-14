import React, {useState, useEffect} from 'react'
import VideoRoom from './VideoRoom'
import ChatRoom from './ChatRoom'
import ParticipantList from './ParticipantList'
import axios from 'axios'
import {quickSort } from './Sortname.js'
import { initializeChatListeners, getBufferedMessages } from '../../services/Chat/chatService.js'

const ConferenceRoom = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [isParticipantVisible, setIsParticipantVisible] = useState(false);
  async function handleParticipant(roomId){
    if(isParticipantVisible){
      setIsParticipantVisible(!isParticipantVisible)
      return
    }
    console.log("roomId: ",roomId);
    const response = await axios.post('http://localhost:3000/api/rooms/participants', {
    roomId
    },{
        
        withCredentials: true
    });
    if(response){
        setIsParticipantVisible(!isParticipantVisible);
        console.log('response: ',response.data);
        const users = response.data;
        
            const sorted = quickSort(users[0].participants,'name');
            console.log("sorted: ",sorted);
            setParticipants(sorted)
       
       
    }
}
  const handleToggleChat = () => {
    setIsChatVisible(!isChatVisible);
  }
  const recvMessage = (msg,userId, remoteUserId) => {
    if (Array.isArray(msg)) {
      msg.forEach(elem => {
        setMessages(prev => [...prev, {content: elem.content, userId, remoteUserId}]);
      });
    } else {
      setMessages(prev => [...prev, {content: msg.content, userId, remoteUserId}]);
    }
      
    }
// Initialize listeners once when component mounts
useEffect(() => {
  initializeChatListeners(recvMessage);
}, []);

// When chat becomes visible, process any buffered messages
useEffect(() => {
  if (isChatVisible) {
      const bufferedMessages = getBufferedMessages();
      bufferedMessages.forEach(({msg, userId}) => {
          recvMessage(msg, socket.id, userId);
      });
  }
}, [isChatVisible]);

  return (
    <div className='bg-zinc-900 flex justify-between items-center w-full'>
      <VideoRoom isChatVisible={isChatVisible} toggleChat={handleToggleChat} handleParticipant={handleParticipant}/>
      { isChatVisible && <ChatRoom  messages={messages} />}
      {/* <ChatRoom /> */}
      {isParticipantVisible && <ParticipantList participants={participants}/>}

    </div>
  )
}

export default ConferenceRoom
// export {localVideoRef}