import React, {useState} from 'react'
import VideoRoom from './VideoRoom'
import ChatRoom from './ChatRoom'
import ParticipantList from './ParticipantList'
import axios from 'axios'
import {quickSort } from './Sortname.js'

const ConferenceRoom = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
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
        // setParticipants(users[0].participants)
        // users.forEach(user => {
        //     if(user.participants){
        //       user.participants.forEach(participant => {
        //         setParticipants([...participants,participant.name]);
        //             console.log('name: ',participant.name);
        //         }); 
                
        //     }


            const sorted = quickSort(users[0].participants,'name');
            console.log("sorted: ",sorted);
            setParticipants(sorted)
        // })
        
       
    }
}
  const handleToggleChat = () => {
    setIsChatVisible(!isChatVisible);
  }
  return (
    <div className='bg-zinc-900 flex justify-between items-center w-full'>
      <VideoRoom isChatVisible={isChatVisible} toggleChat={handleToggleChat} handleParticipant={handleParticipant}/>
      { isChatVisible && <ChatRoom />}
      {isParticipantVisible && <ParticipantList participants={participants}/>}

    </div>
  )
}

export default ConferenceRoom
// export {localVideoRef}