import React, { useEffect, useState } from 'react'
import Pen from '../ShapeColorPen/Pen'
import Shape from '../ShapeColorPen/Shape';
import Color from '../ShapeColorPen/Color';
import Table from '../ShapeColorPen/Table';



const Bottom = ({tool,setTool,texts,setTexts,color,strokeWidth,}) => {
    return (
        <div>
            <footer className='fixed w-full bottom-2 flex flex-col items-center gap-1 z-10'>
                {tool === "pen" ? (<Pen />) : ""}
                {tool === "shape" ? (<Shape />) : ""}
                {tool === "color" ? (<Color />) : ""}
                {tool === "table" ? (<Table />) : ""}
                <ul className='w-fit px-5 rounded-full bg-gray-300 py-1 flex justify-center gap-3 text-2xl hover:[&>*]:cursor-pointer active:[&>li]:bg-blue-600 [&>*]:rounded-md'>
                    <li><i className="fa-solid fa-rotate-left" onClick={() => setTool("")}></i></li>
                    <li><i className="fa-solid fa-rotate-right" onClick={() => setTool("")}></i></li>
                    <li style={{ background: tool === "pen" ? "blue" : "" }}><i className="fa-solid fa-pencil" onClick={() => setTool("pen")}></i></li>
                    <li style={{ background: tool === "eraser" ? "blue" : "" }}><i className="fa-solid fa-eraser" onClick={() => setTool("eraser")}></i></li>
                    <li style={{ background: tool === "text" ? "blue" : "" }} onClick={() => setTool("text")}><i className="fa-regular fa-keyboard"></i></li>
                    <li style={{ background: tool === "shape" ? "blue" : "" }}><i className="fa-solid fa-shapes" onClick={() => setTool("shape")}></i></li>
                    <li style={{ background: tool === "color" ? "blue" : "" }}><i className="fa-solid fa-palette text-yellow-700" onClick={() => setTool("color")}></i></li>
                    <li style={{ background: tool === "table" ? "blue" : "" }}><i className="fa-solid fa-table-cells" onClick={() => setTool("table")}></i></li>
                </ul>

            </footer>
        </div>
    )
}

export default Bottom
