import React from 'react'

// Props ko receive karein
const Pen = ({ tool, setTool, strokeWidth, setStrokeWidth }) => {
    
    // Size ko control karne ke functions
    const increaseSize = () => setStrokeWidth(prev => Math.min(prev + 1, 50)); // Max size 50
    const decreaseSize = () => setStrokeWidth(prev => Math.max(prev - 1, 1));  // Min size 1

    return (
        <div>
            <ul className='w-fit px-5 rounded-full bg-gray-300 py-1 flex justify-center items-center gap-1 text-2xl hover:[&>*]:cursor-pointer [&>*]:rounded-md'>
                
                {/* Pen Tool */}
                <li 
                    className={`px-2 ${tool === 'pen' ? 'bg-blue-300' : ''}`}
                    onClick={() => setTool('pen')}
                >
                    <i className="fa-solid fa-pencil text-blue-600"></i>
                </li>
                
                {/* Brush/Highlighter Tool (isko humne tool='brush' naam diya) */}
                <li 
                    className={`px-2 ${tool === 'brush' ? 'bg-blue-300' : ''}`}
                    onClick={() => setTool('brush')}
                >
                    <i className="fa-solid fa-paintbrush text-red-500"></i>
                </li>

                {/* Eraser Tool (agar tool='eraser' hai) */}
                <li 
                    className={`px-2 ${tool === 'eraser' ? 'bg-blue-300' : ''}`}
                    onClick={() => setTool('eraser')}
                >
                    <i className="fa-solid fa-eraser text-gray-600"></i>
                </li>

                {/* Size Controls */}
                <ul className='px-2 rounded-lg bg-gray-200 py-1 flex gap-3 items-center [&>li]:bg-white [&>li]:rounded-md active:[&>li]:bg-slate-400 text-sm ml-2'>
                    <li>
                        <i className="fa-solid fa-minus px-1 cursor-pointer" onClick={decreaseSize}></i>
                    </li>
                    <span className='w-4 text-center font-bold'>{strokeWidth}</span>
                    <li>
                        <i className="fa-solid fa-plus px-1 cursor-pointer" onClick={increaseSize}></i>
                    </li>
                </ul>
            </ul>
        </div>
    )
}

export default Pen