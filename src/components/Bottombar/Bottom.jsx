import React, { useEffect, useState } from 'react'
import Pen from '../ShapeColorPen/Pen'
import Shape from '../ShapeColorPen/Shape';
import Color from '../ShapeColorPen/Color';
import Table from '../ShapeColorPen/Table';
const Bottom = () => {
    const [Size, SetSize] = useState(50);
    const [isActive, setisActive] = useState("");
    return (
        <div>
            <footer className='fixed w-full bottom-2 flex flex-col items-center gap-1'>
                {isActive === "pen" ? (<Pen />) : ""}
                {isActive === "shape" ? (<Shape />) : ""}
                {isActive === "color" ? (<Color />) : ""}
                {isActive === "table" ? (<Table />) : ""}

                <ul className='w-fit px-5 rounded-full bg-gray-300 py-1 flex justify-center gap-3 text-2xl hover:[&>*]:cursor-pointer active:[&>li]:bg-blue-600 [&>*]:rounded-md'>
                    <li><i className="fa-solid fa-rotate-left" onClick={() => setisActive("")}></i></li>
                    <li><i className="fa-solid fa-rotate-right" onClick={() => setisActive("")}></i></li>
                    <li style={{ background: isActive === "pen" ? "blue" : "" }}><i className="fa-solid fa-pencil" onClick={() => setisActive("pen")}></i></li>
                    <li style={{ background: isActive === "eraser" ? "blue" : "" }}><i className="fa-solid fa-eraser" onClick={() => setisActive("eraser")}></i></li>
                    <li style={{ background: isActive === "keyboard" ? "blue" : "" }}><i className="fa-regular fa-keyboard" onClick={() => setisActive("keyboard")}></i></li>
                    <li style={{ background: isActive === "shape" ? "blue" : "" }}><i className="fa-solid fa-shapes" onClick={() => setisActive("shape")}></i></li>
                    <li style={{ background: isActive === "color" ? "blue" : "" }}><i class="fa-solid fa-palette text-yellow-700" onClick={() => setisActive("color")}></i></li>
                    <li style={{ background: isActive === "table" ? "blue" : "" }}><i className="fa-solid fa-table-cells" onClick={() => setisActive("table")}></i></li>
                </ul>
                <ul className='fixed right-5 bottom-2 w-auto px-5 rounded-full bg-gray-200 py-1 flex gap-3 [&>li]:bg-white [&>li]:rounded-md active:[&>li]:bg-slate-400 hover:[&>li]:cursor-pointer'>
                    <li><i className="fa-solid fa-minus" onClick={() => SetSize(Size - 1)}></i></li>
                    <span className='w-8'>{Size}%</span>
                    <li><i className="fa-solid fa-plus" onClick={() => SetSize(Size + 1)}></i></li>
                </ul>
            </footer>
        </div>
    )
}

export default Bottom
