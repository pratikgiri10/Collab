import React from 'react'

const Signup = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
        <div className='px-12 py-8 bg-white rounded-xl shadow-lg shadow-cyan-800'>
          <h1 className='text-3xl font-semibold  text-black '>Sign In</h1>
          <h1 className='border-b-2 border-black w-24'></h1>
            <form 
            required
            className='flex flex-col gap-5 mt-5 text-black'>
               <input 
                required
                className='border-b-2 py-3 text-[1.2rem] placeholder:text-gray-500 outline-none' type="email"  placeholder='Fullname'/>
                <input 
                required
                className='border-b-2 py-3 text-[1.2rem] placeholder:text-gray-500 outline-none' type="email"  placeholder='Email Address'/>
                <input 
                className='border-b-2 py-3  text-[1.2rem] placeholder:text-gray-500 outline-none' type="password" placeholder='Password'/>
                <p className='text-blue-600 hover:text-blue-800'>Forgot password?</p>
                <button className=' w-full border-none text-white bg-[#044c69] py-2 px-6 rounded text-xl outline-none' type='submit'>Sign In</button>
                <p className='text-black'>Haven't registered yet? <span className='text-blue-600 hover:text-blue-800 hover:underline underline-offset-4'> Register Now</span></p>
            </form>
        </div>
    </div>
  )
}

export default Signup