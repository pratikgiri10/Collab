import React from 'react'
import Header from '../../components/Navbar/Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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
    <>
    <Header />
    <div className=' text-white m-4'>
        <div className='bg-[#044c69] px-10 py-4  text-center'>
            <h1 className='text-3xl'>Connect Seamlessly, Anywhere in the World</h1>
        </div>
        <div className='flex justify-between items-center gap-4 mt-8 w-full'>
            <div className='flex flex-col gap-8 bg-white px-8 py-10 text-black h-[400px] w-1/2 rounded-3xl'>
                <h1 className='text-4xl leading-snug'>Hey there, <br /><span>Schedule Your Meetings</span></h1>
                <p className='w-[300px] text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, earum.</p>
                <button
                onClick={() => {
                    scheduleMeeting();
                }}
                className='text-xl bg-[#044c69] hover:bg-cyan-700 text-white px-8 py-2 w-1/2'>Schedule</button>
            </div>
            <div className='flex flex-col gap-8 items-end text-right bg-[#044c69] px-8 py-10 text-white h-[400px] w-1/2 rounded-3xl'>
                <h1 className='text-4xl leading-snug'>Hey there,<br/><span>Join the Meeting</span></h1>
                <p className='w-[300px] text-lg leading-normal'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, earum.</p>
                <button 
                 onClick={() => {
                    joinMeeting();
                }}
                className='text-xl bg-white hover:bg-gray-300 text-black px-8 py-2 w-1/2'>Join</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home