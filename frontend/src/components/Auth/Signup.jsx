import React, { useState } from 'react'

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://127.0.0.1:3000/api/users/register', {
      name,email,password
    },{
      withCredentials: true, // Include cookies
    });
    if(response) console.log('response: ',response.data);
  }

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
        <div className='px-12 py-8 bg-white rounded-xl shadow-lg shadow-cyan-800'>
          <h1 className='text-3xl font-semibold  text-black '>Sign Up</h1>
          <h1 className='border-b-2 border-black w-24'></h1>
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
                className='border-b-2 py-3 text-[1.2rem] placeholder:text-gray-500 outline-none' type="email"  placeholder='Fullname'/>
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
                className='border-b-2 py-3  text-[1.2rem] placeholder:text-gray-500 outline-none' type="password" placeholder='Password'/>
        
                <button className=' w-full border-none text-white bg-[#044c69] py-2 px-6 rounded text-xl outline-none' type='submit'>Sign Up</button>
            </form>
        </div>
    </div>
  )
}

export default Signup