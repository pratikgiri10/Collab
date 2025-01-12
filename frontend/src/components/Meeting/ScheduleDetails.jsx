import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import SearchBox from '../Navbar/SearchBox';
const ScheduleDetails = () => {
  const [details, setDetails] = useState([]);
  const [resData, setResData] = useState([]);
  const startRef = useRef({});
  const navigate = useNavigate();

 
    const searchMeeting = (searchVal) => {
      console.log('search meeting: ',details);
      console.log('search val: ',searchVal);
      if(searchVal == ""){
        setDetails(resData);
        return;
      }
        const result =  resData.filter((data) => data.title == searchVal);
        console.log("result: ",result);
        if(result){
          setDetails(result);
        }
        
        
      
  
    }

   useEffect(() => {
    const meetingDetails = async () => {
        const response = await axios.get('http://localhost:3000/api/meeting/details',{
          withCredentials: true, // Include cookies
        })
        if(response){
            console.log('response: ',response.data);
            setDetails(response.data);
            setResData(response.data);
        }
    }
    meetingDetails();
   }, [])
   const editMeeting = (roomId) => {
    const selectData = details.find((data) => data.meetingId == roomId)
    if(details){
      navigate('/schedulemeeting', { state : { selectData }})
    }
   }
   const startMeeting = (roomId) => {
    if(roomId){
      console.log(roomId)
      navigate('/meetingroom',{state: {roomId: roomId}})

    }
   }  

   const deleteMeeting = async (id,e) => {
    console.log("id: ",id)
    try{
      const response = await axios.delete('http://localhost:3000/api/meeting/delete',{
        data: {id},
        withCredentials: true
      })
      if(response.data.isDeleted){
        console.log(response.data)
        e.target.parentNode.parentNode.remove();
      }
    }catch(err){
      console.log(err)
    }
   
   }
  return (
    <div className='bg-white h-screen py-10 px-20 flex flex-col gap-6'>
      <SearchBox searchMeeting={searchMeeting}/>
       {details.map((data,idx) => {
          return <div key={idx} className='flex flex-col gap-5 w-2/3'>
              <div className='flex items-center justify-between'>
                <h1 className='text-xl font-medium'>Title:</h1>
                <p className='text-xl'>{data.title}</p>
              </div>
              <div className='flex items-center justify-between'>
                <h1 className='text-xl font-medium'>Start Time:</h1>
                <p className='text-xl'>{new Date(data.startTime).toLocaleString()}</p>
              </div>
              <div className='flex items-center justify-between'>
                <h1 className='text-xl font-medium'>End Time:</h1>
                <p className='text-xl'>{new Date(new Date(data.startTime).getTime() + data.duration * 60000).toLocaleString()}</p>
              </div>
              <div className='flex items-center justify-between'>
                <h1 className='text-xl font-medium'>Meeting Id:</h1>
                <p 
                ref={startRef}
                className='text-xl'>{data.meetingId}</p>
              </div>
              <div className='flex items-center justify-between'>
                <h1 className='text-xl font-medium'>Password:</h1>
                <p className='text-xl'>{data.password}</p>
              </div>
              <div className='flex gap-2 text-white'>
                <button 
                onClick={() => {
                  startMeeting(data.meetingId)
                }}
                className='bg-[#044c69] px-4 py-2 hover: cursor-pointer hover:opacity-90'>Start</button>
                <button 
                onClick={() => {
                  editMeeting(data.meetingId);
                }}
                className='bg-[#044c69] px-4 py-2'>Edit</button>
                <button 
                onClick={(e) => {
                  deleteMeeting(data.meetingId,e);
                }}
                className='bg-[#044c69] px-4 py-2'>Delete</button>
              </div>
        </div>
        })}
      
    </div>
  )
}

export default ScheduleDetails