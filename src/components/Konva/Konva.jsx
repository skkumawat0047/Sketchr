import React, { useState } from "react";
import { Circle, Layer, Rect, Stage, Text } from "react-konva";


const Konva = () => {
  const [zoom, setZoom] = useState(1);
  const [word, setword] = useState("hello")

  return (
    <>
      <div className="overflow-hidden w-full h-screen border-2 border-gray-400 bg-gray-300 shadow-lg">
        <Stage
          width={window.innerWidth}
          height={window.innerHeight} // Navbar ki height agar 64px hai
          scaleX={zoom}
          scaleY={zoom}
          className="bg-white"
          draggable
        >
          
          <Layer>
            <Circle
              x={350}
              y={350}
              radius={100}
              stroke="black"
              strokeWidth={2}
              draggable
            />
            <Text
              x={window.innerWidth / 2}
              y={15}
              text={word}
              fontSize={30}
              fontFamily="Calibri"
              fill="black"
              offsetX={60} // Approximate half width
              draggable
            />
          </Layer>
        </Stage>
      </div>

      {/* Zoom Controls */}
      <ul className="fixed right-5 bottom-5 z-50 px-5 py-2 rounded-full bg-gray-200 flex items-center gap-3 shadow-lg">
        <li
          className="bg-white rounded-md px-1 cursor-pointer"
          onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.1))}
        >
          <i className="fa-solid fa-minus"></i>
        </li>

        <span className="w-10 text-center">
          {Math.round(zoom * 100)}%
        </span>

        <li
          className="bg-white rounded-md px-1 cursor-pointer"
          onClick={() => setZoom((prev) => Math.min(3, prev + 0.1))}
        >
          <i className="fa-solid fa-plus"></i>
        </li>
      </ul>
    </>
  );
};

export default Konva;