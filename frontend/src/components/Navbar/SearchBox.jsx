import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";

const SearchBox = ({searchMeeting}) => {
  const [searchVal, setSearchVal] = useState('');
  const handleSubmit = (e) => {
    setSearchVal(e.target.value);
    console.log('clicked: ',searchVal);
    searchMeeting(searchVal);
  }
  return (
    <div className='bg-white flex gap-x-80 items-center text-black'>
        <div>
            <h1 className='text-2xl'>Collab</h1>
        </div>
        <div className='flex items-center gap-2 w-[550px]'>
            <input           
            value={searchVal}
            onChange={handleSubmit}
            className='w-[500px] p-3 text-[1.2rem] bg-[#044c69] rounded-3xl outline-none text-white placeholder:text-gray-200'  
            type="search" placeholder='search'/>
            <button
            // onClick={handleSubmit}
            className='outline-none'
            ><CiSearch color='white' className='h-[50px] w-[50px] bg-[#044c69] p-3 rounded-3xl'/></button>
        </div>
    </div>
  )
}

export default SearchBox