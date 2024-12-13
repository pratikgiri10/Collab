import { useState } from 'react'
import Signin from './components/Auth/Signin'
import Signup from './components/Auth/Signup'
import Header from './components/Navbar/Header'
import Home from './pages/HomePage/Home'
import VideoRoom from './components/MeetingRoom/VideoRoom'
import ChatRoom from './components/MeetingRoom/ChatRoom'
import ConferenceRoom from './components/MeetingRoom/ConferenceRoom'
import JoinRoom from './components/Meeting/JoinRoom'
import Schedule from './components/Meeting/Schedule'


function App() {
 
  return (
    <>
     <div>
      <ConferenceRoom />
     </div>
    </>
  )
}

export default App
