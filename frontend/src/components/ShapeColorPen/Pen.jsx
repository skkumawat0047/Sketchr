import React from 'react'

// Props ko receive karein
const Pen = ({ tool, setTool, strokeWidth, setStrokeWidth }) => {
    return (
        <div>
            <ul className='w-fit px-3 rounded-full bg-gray-300 py-1 flex justify-center items-center gap-1 text-2xl hover:[&>*]:cursor-pointer [&>*]:rounded-md'>

                {/* Pen Tool */}
                <li
                    className={`px-1 ${tool === 'pen' ? 'bg-blue-300' : ''}`}
                    onClick={() => setTool('pen')}
                >
                    <i className="fa-solid fa-pencil text-blue-600"></i>
                </li>

                {/* Brush/Highlighter Tool (isko humne tool='brush' naam diya) */}
                <li
                    className={`px-1 ${tool === 'brush' ? 'bg-blue-300' : ''}`}
                    onClick={() => setTool('brush')}
                >
                    <i className="fa-solid fa-paintbrush text-red-500"></i>
                </li>

                {/* Eraser Tool (agar tool='eraser' hai) */}
                <li
                    className={`px-1 ${tool === 'eraser' ? 'bg-blue-300' : ''}`}
                    onClick={() => setTool('eraser')}
                >
                    <i className="fa-solid fa-eraser text-gray-600"></i>
                </li>

                {/* Size Control Slider */}
                <div className='px-3 rounded-lg bg-gray-200 py-1.5 flex gap-1 items-center text-xs ml-2 select-none'>
                    <span className='text-gray-600 font-medium text-xs'>Size</span>
                    <input
                        type="range"
                        min="1"
                        max="50"
                        value={strokeWidth}
                        onChange={(e) => setStrokeWidth(Number(e.target.value))}
                        className="w-24 h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <span className='w-5 text-center font-bold text-gray-800 text-xs'>{strokeWidth}px</span>
                </div>
            </ul>
        </div>
    )
}

export default Pen