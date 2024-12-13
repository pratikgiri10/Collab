import React from 'react'

const Header = () => {
  return (
    <div className='w-full bg-white'>
        <nav className='flex justify-between items-center px-14 py-5 text-black'>
            <div>
                <h1 className='text-2xl '>Collab</h1>
            </div>
            <div className='flex gap-10 text-xl'>
                <a href="#home">Home</a>
                <a href="#about">Meetings</a>
                <a href="#services">About</a>
                <a href="#contact">Contact</a>
            </div>
            <div>
                <button className='text-xl bg-[#044c69] text-white px-8 py-2'>Sign In</button>
            </div>
        </nav>
    </div>
  )
}

export default Header