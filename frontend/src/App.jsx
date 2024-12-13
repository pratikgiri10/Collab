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
import ScheduleDetails from './components/Meeting/ScheduleDetails'


function App() {
 
  return (
    <>
     <div>
      <JoinRoom />
     </div>
    </>
  )
}

export default App
