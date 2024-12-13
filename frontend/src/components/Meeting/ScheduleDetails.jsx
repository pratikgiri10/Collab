import React, { useEffect } from 'react'
import axios from 'axios'
const ScheduleDetails = () => {

   useEffect(() => {
    const meetingDetails = async () => {
        const response = await axios.get('http://localhost:3000/api/meeting/details',{
          withCredentials: true, // Include cookies
        })
        if(response){
            console.log('response: ',response.data);
        }
    }
    meetingDetails();
   }, [])
   

  return (
    <div>ScheduleDetails</div>
  )
}

export default ScheduleDetails