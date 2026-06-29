import React, { useEffect, useState } from 'react'
import Shape from '../ShapeColorPen/Shape'
const Bottom = () => {
    const [Size,SetSize]=useState(50);
    return (
        <div>
            <footer className='fixed w-full bottom-2 flex flex-col items-center gap-1'>
                <Shape/>
                <ul className='w-fit px-5 rounded-full bg-gray-300 py-1 flex justify-center gap-3 text-2xl hover:[&>*]:cursor-pointer active:[&>li]:bg-blue-600 [&>*]:rounded-md'>
                    <li><i className="fa-solid fa-rotate-left"></i></li>
                    <li><i className="fa-solid fa-rotate-right"></i></li>
                    <li><i className="fa-solid fa-pencil"></i></li>
                    <li><i className="fa-solid fa-eraser"></i></li>
                    <li><i className="fa-regular fa-keyboard"></i></li>
                    <li><i className="fa-solid fa-shapes"></i></li>
                    <li><i class="fa-solid fa-palette text-yellow-700"></i></li>
                    <li><i className="fa-solid fa-table-cells"></i></li>
                </ul>
                <ul className='fixed right-5 bottom-2 w-auto px-5 rounded-full bg-gray-200 py-1 flex gap-3 [&>li]:bg-white [&>li]:rounded-md active:[&>li]:bg-slate-400 hover:[&>li]:cursor-pointer'>
                    <li><i className="fa-solid fa-minus" onClick={()=>SetSize(Size-1)}></i></li>
                    <span>{Size}%</span>
                    <li><i className="fa-solid fa-plus" onClick={()=>SetSize(Size+1)}></i></li>
                </ul>
            </footer>
        </div>
    )
}

export default Bottom
