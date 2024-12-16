import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
const Header = () => {
  
  const navigate = useNavigate();
  const checkSession = async () => {
    const response = await axios.get('http://localhost:3000/api/session/check',{
        withCredentials: true
    })
    console.log(response);
    return response.data.loggedIn
}
const handleNavigation = async () => {
  const res = await checkSession();
  if(res){
    navigate('/meetingdetails')
  }
  else{
    navigate('/signin');
  }
}

  return (
    <div className='w-full bg-white'>
        <nav className='flex justify-between items-center px-14 py-5 text-black'>
            <div>
                <h1 className='text-2xl '>Collab</h1>
            </div>
            <div className='flex gap-10 text-xl'>
               <Link to='/' className='hover:underline underline-offset-8'>Home</Link>
               <h1 onClick={handleNavigation} className='hover: cursor-pointer hover:underline underline-offset-8'>Meetings</h1>
               
            </div>
            <div>
                <button 
                onClick={() => {
                navigate('/signin')
                }}
                className='text-xl bg-[#044c69] text-white px-8 py-2 hover:cursor-pointer hover:bg-cyan-700'>Sign In</button>
            </div>
        </nav>
    </div>
  )
}

export default Header