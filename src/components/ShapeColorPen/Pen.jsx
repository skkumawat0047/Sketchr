import React, { useState } from 'react'

const Pen = () => {
    const [Size,setSize]=useState(3);
    return (
        <div>
            <ul className='w-fit px-5 rounded-full bg-gray-300 py-1 flex justify-center gap-3 text-2xl hover:[&>*]:cursor-pointer active:[&>li]:bg-blue-600 [&>*]:rounded-md'>
                <li><i className="fa-solid fa-pencil text-blue-400"></i></li>
                <li><i class="fa-solid fa-highlighter text-red-400"></i></li>
                <ul className='px-2 rounded-lg bg-gray-200 py-1 flex gap-3 [&>li]:bg-white [&>li]:rounded-md active:[&>li]:bg-slate-400 text-sm'>
                    <li><i className="fa-solid fa-minus" onClick={()=>setSize(Size-1)}></i></li>
                    <span>{Size}</span>
                    <li><i className="fa-solid fa-plus" onClick={()=>setSize(Size+1)}></i></li>
                </ul>
            </ul>
        </div>
    )
}

export default Pen
