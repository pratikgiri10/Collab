import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // const validate = () => {
  //   const newErrors = {};
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if(!emailRegex.test(email)){
  //     newErrors.email = 'Invalid Email Format.';
  //   }
  //   if(password.length < 8){
  //     newErrors.password = 'Password must be at least 8 characters long.'
  //   }
  //   if(password != confirmPassword){
  //     newErrors.confirmPassword = 'Passwords do not match.'
  //   }
  //   setErrors(newErrors);

  //   return Object.keys(newErrors).length === 0;
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    
    try{
      const response = await axios.post('http://127.0.0.1:3000/api/users/register', {
        name,email,password
      },{
        withCredentials: true, // Include cookies
      });
      if(response.status == 201){
        console.log('response: ',response.statusText);
        navigate('/signin');
      } 
    }catch(error){
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Registration failed:", error.response.data);  // Log the server's error message
  
        if (error.response.status === 409) {
            // Specific handling for 409 Conflict
            alert("A user with that email or username already exists."); // Show a user-friendly error
            // ... other actions like updating state to display the error message
        } else {
            alert("An error occurred during registration. Please try again later."); // Generic error for other status codes
        }
  
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        alert("No response from the server. Check your network connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
        alert("An error occurred. Please try again later.");
      }
    
    }
    
  }

  return (
    <div className='bg-[#044c69] flex h-screen w-screen items-center justify-center'>
        <div className='px-12 py-8 bg-white rounded-xl shadow-lg shadow-cyan-800'>
          <h1 className='text-3xl font-semibold  text-black '>Sign Up</h1>
          <h1 className='border-b-2 border-black w-28'></h1>
            <form
            onSubmit={(e) => {
              handleSubmit(e)
            }} 
            required
            className='flex flex-col gap-5 mt-5 text-black'>
               <input 
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                required
                className='border-b-2 py-3 text-[1.2rem] placeholder:text-gray-500 outline-none' type="text"  placeholder='Fullname'/>
                <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                required
                className='border-b-2 py-3 text-[1.2rem] placeholder:text-gray-500 outline-none' type="email"  placeholder='Email Address'/>
                
                <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                required 
                className='border-b-2 py-3  text-[1.2rem] placeholder:text-gray-500 outline-none' type="password" placeholder='Password'/>
                {/* <input
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
                required 
                className='border-b-2 py-3  text-[1.2rem] placeholder:text-gray-500 outline-none' type="password" placeholder='Confirm Password'/>*/}
                <button className=' w-full border-none text-white bg-[#044c69] py-2 px-6 rounded text-xl outline-none' type='submit'>Sign Up</button>
            </form>
        </div>
    </div>
  )
}

export default Signup