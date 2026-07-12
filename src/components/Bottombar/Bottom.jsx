import React, { useState, useEffect } from 'react';
import Pen from '../ShapeColorPen/Pen'
import Shape from '../ShapeColorPen/Shape';
import Color from '../ShapeColorPen/Color';
import Table from '../ShapeColorPen/Table';
import { Pointer } from 'lucide-react';

const Bottom = ({ tool, setTool, texts, setTexts, color, setColor, strokeWidth, setStrokeWidth, shapeType, setShapeType, tableConfig, setTableConfig, handleUndo, handleRedo}) => {
    
    // Nayi state jo control karegi ki popup dikhana hai ya chupana hai
    const [isMenuVisible, setIsMenuVisible] = useState(true);

    // Ye effect canvas par click hote hi popup ko chupa dega
    useEffect(() => {
      const handleGlobalClick = (e) => {
        // Konva library hamesha <canvas> tag banati hai
        // Agar click canvas par hua hai, to menu gayab kar do
        if (e.target.tagName === 'CANVAS') {
            if (tool === 'mover') return;
          setIsMenuVisible(false);
        }
      };
      
      // Mouse click aur Touch (mobile) dono ke liye events laga diye
      window.addEventListener('mousedown', handleGlobalClick);
      window.addEventListener('touchstart', handleGlobalClick);
      
      return () => {
        window.removeEventListener('mousedown', handleGlobalClick);
        window.removeEventListener('touchstart', handleGlobalClick);
      };
    }, []);

    // Jab bhi kisi tool icon (niche wale button) par click ho, to popup ko wapas dikha do
    const handleToolClick = (newTool) => {
        setTool(newTool);
        setIsMenuVisible(true); 
    };

    return (
        <div>
            <footer className='fixed w-full bottom-2 flex flex-col items-center gap-1 z-10'>
                
                {/* Popups tabhi dikhenge jab isMenuVisible true hoga */}
                {isMenuVisible && (
                  <>
                    {(tool === "pen" || tool === "brush" || tool === "eraser") && (
                        <Pen tool={tool} setTool={setTool} strokeWidth={strokeWidth} setStrokeWidth={setStrokeWidth} />
                    )}
                    {tool === "shape" ? (<Shape shapeType={shapeType} setShapeType={setShapeType} />) : ""}
                    {tool === "color" ? (<Color color={color} setColor={setColor} />) : ""}
                    {tool === "table" ? (<Table tableConfig={tableConfig} setTableConfig={setTableConfig} />) : ""}
                  </>
                )}

                <ul className='w-fit px-5 rounded-full bg-gray-300 py-1 flex justify-center gap-3 text-2xl hover:[&>*]:cursor-pointer active:[&>li]:bg-blue-600 [&>*]:rounded-md'>
                    <li style={{ background: tool === "mover" ? "blue" : "",cursor:"pointer" }}><i className="fa-regular fa-hand-pointer" onClick={() =>{tool==='mover'?handleToolClick('pen'):handleToolClick('mover')}} ></i></li>
                    <li><i className="fa-solid fa-rotate-left" onClick={handleUndo}></i></li>
                    <li><i className="fa-solid fa-rotate-right" onClick={handleRedo}></i></li>
                    
                    {/* onClick me ab naya function (handleToolClick) daal diya gaya hai */}
                    <li style={{ background: tool === "pen" ? "blue" : "" }}>
                        <i className="fa-solid fa-pencil" onClick={() => handleToolClick("pen")}></i>
                    </li>
                    <li style={{ background: tool === "eraser" ? "blue" : "" }}>
                        <i className="fa-solid fa-eraser" onClick={() => handleToolClick("eraser")}></i>
                    </li>
                    <li style={{ background: tool === "text" ? "blue" : "" }} onClick={() => handleToolClick("text")}>
                        <i className="fa-regular fa-keyboard"></i>
                    </li>
                    <li style={{ background: tool === "shape" ? "blue" : "" }}>
                        <i className="fa-solid fa-shapes" onClick={() => handleToolClick("shape")}></i>
                    </li>
                    <li style={{ background: tool === "color" ? "blue" : "" }}>
                        <i className="fa-solid fa-palette text-yellow-700" onClick={() => handleToolClick("color")}></i>
                    </li>
                    <li style={{ background: tool === "table" ? "blue" : "" }}>
                        <i className="fa-solid fa-table-cells" onClick={() => handleToolClick("table")}></i>
                    </li>
                </ul>

            </footer>
        </div>
    )
}

export default Bottom;