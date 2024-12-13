import React from 'react'
import VideoRoom from './VideoRoom'
import ChatRoom from './ChatRoom'

const ConferenceRoom = () => {
  return (
    <div className='bg-zinc-900 flex justify-between items-center'>
      <VideoRoom />
      <ChatRoom />

    </div>
  )
}

export default ConferenceRoom
// export {localVideoRef}