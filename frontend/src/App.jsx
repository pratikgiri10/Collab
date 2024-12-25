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
import { Route, Routes } from 'react-router-dom'
import Login from './components/AdminDashboard/Login'
import SearchBox from './components/Navbar/SearchBox'


function App() {
 
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signin' element={<Signin />}></Route>
      <Route path='/admin/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/meetingroom' element={<ConferenceRoom />}></Route>
      <Route path='/chatroom' element={<ChatRoom />}></Route>
      <Route path='/schedulemeeting' element={<Schedule />}></Route>
      <Route path='/meetingdetails' element={<ScheduleDetails />}></Route>
      <Route path='/joinmeeting' element={<JoinRoom />}></Route>
      <Route path='/search' element={<SearchBox />}></Route>
    </Routes>
     
     
    </>
  )
}

export default App
