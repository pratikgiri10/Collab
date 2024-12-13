import React from 'react'
import Header from '../../components/Navbar/Header'

const Home = () => {
  return (
    <>
    <Header />
    <div className=' text-white m-4'>
        <div className='bg-[#044c69] px-10 py-4  text-center'>
            <h1 className='text-3xl'>Connect Seamlessly, Anywhere in the World</h1>
        </div>
        <div className='flex justify-between items-center gap-4 mt-8 w-full'>
            <div className='flex flex-col gap-10 bg-white px-8 py-10 text-black h-[400px] w-1/2 rounded-3xl'>
                <h1 className='text-4xl leading-snug'>Hey there, <br /><span>Schedule Your Meetings</span></h1>
                <p className='w-[300px] text-l'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, earum.</p>
                <button className='text-xl bg-[#044c69] hover:bg-transparent hover:text-black text-white px-8 py-2 w-1/2'>Schedule</button>
            </div>
            <div className='flex flex-col gap-10 items-end text-right bg-[#044c69] px-8 py-10 text-white h-[400px] w-1/2 rounded-3xl'>
                <h1 className='text-4xl leading-snug'>Hey there,<br/><span>Join the Meeting</span></h1>
                <p className='w-[300px] text-l leading-normal'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, earum.</p>
                <button className='text-xl bg-white hover:bg-transparent hover:text-white text-black px-8 py-2 w-1/2'>Join</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home