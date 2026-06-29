import React from 'react'
import ReactColor from '../ReactColor/ReactColor'

const Shape = () => {
    return (
        <div className='border-2 border-black max-w-96  bg-sky-200 rounded-lg p-1 '>
            <input className='border-[1px] border-gray-800 rounded-md px-1 w-full mb-1' type="text" placeholder='Search' />
            <hr className='border-1 border-black my-1'/>
            <div className="flex flex-wrap gap-1 h-20 overflow-y-auto scroll-auto scrollbar-thin scrollbar-thumb-violet-950 p-1 rounded-md [&>i]:w-10 [&>i]:h-10 [&>i]:flex [&>i]:items-center [&>i]:justify-center [&>i]:rounded-md [&>i]:cursor-pointer [&>i]:transition active:[&>i]:bg-blue-400 text-2xl">
                <ReactColor/>
            </div>
        </div>
    )
}

export default Shape
