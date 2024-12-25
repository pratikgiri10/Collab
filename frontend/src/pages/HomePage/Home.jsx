import React from 'react'
import Header from '../../components/Navbar/Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaRegCalendarPlus } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";

const Home = () => {
    const navigate = useNavigate();
    const checkSession = async () => {
        const response = await axios.get('http://localhost:3000/api/session/check',{
            withCredentials: true
        })
        console.log(response);
        return response.data
    }
    const scheduleMeeting = async () => {
        const data =  await checkSession();
        if(data.loggedIn){
            console.log(data.user)
            navigate('/schedulemeeting');
        }
        else{
            console.log(data.user)
            navigate('/signin');
        }
        
    }
    const joinMeeting = async () => {
        const data =  await checkSession();
        if(data.loggedIn){
            console.log(data.user)
            navigate('/joinmeeting');
        }
        else{
            console.log(data.user)
            navigate('/signin');
        }
        
    }
    
  return (
    <div className='h-screen flex flex-col'>
    <Header />
    <div className='bg-white text-black w-full overflow-y-hidden'>       
        <div className='flex flex-col items-center gap-10 w-full py-10'>
            <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className='text-4xl font-medium'>Connect Seamlessly, Anywhere in the World</h1>
                <p className='text-lg w-[650px]'>Designed for reliability and ease of use, it connects teams effortlessly across the globe and adapts to meet the needs of any size group.</p>
            </div>
            <div className='flex items-center justify-center gap-4'>
                <button
                onClick={() => {
                    scheduleMeeting();
                }}
                className='flex items-center gap-4 text-xl bg-[#044c69] hover:bg-cyan-700 text-white px-8 py-2 w-[200px]'><FaRegCalendarPlus /> Schedule</button>
                <button 
                 onClick={() => {
                    joinMeeting();
                }}
                className='flex items-center gap-4 text-xl bg-white hover:bg-gray-300 text-black px-8 py-2 w-[200px]'><FaRegPlusSquare />Join</button>
            </div>
            <div className='flex justify-center object-cover w-1/2 mt-10'>
                <img className='w-full' src="https://cdn.dribbble.com/users/5031392/screenshots/16363958/media/4515f2c0141e34521dd98a29b8f29960.png?resize=400x0" alt="" />
            </div>
        </div>
    </div>
    
    </div>
  )
}

export default Home