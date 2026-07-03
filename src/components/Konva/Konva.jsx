import React, { useState } from "react";
import { Circle, Layer, Rect, Stage } from "react-konva";

const STAGE_WIDTH = 800;
const STAGE_HEIGHT = 500;

const Konva = () => {
  const [zoom, setZoom] = useState(1);

  return (
    <>
      <div className="w-full h-screen bg-red-100 flex justify-center items-center">
        {/* Canvas Container */}
        <div
          className="overflow-hidden border-2 border-gray-400 bg-gray-300 shadow-lg"
          style={{
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
          }}
        >
          <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT} scaleX={zoom} scaleY={zoom} className="bg-white">
            <Layer>
              <Circle x={100} y={100} radius={30} stroke="black" strokeWidth={2} draggable />
            </Layer>
          </Stage>
        </div>
      </div>

      {/* Zoom Controls */}
      <ul className="fixed right-5 bottom-5 z-50 px-5 py-2 rounded-full bg-gray-200 flex items-center gap-3 shadow-lg">
        <li
          className="bg-white rounded-md px-2 py-1 cursor-pointer"
          onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.1))}
        >
          <i className="fa-solid fa-minus"></i>
        </li>

        <span className="w-10 text-center">
          {Math.round(zoom * 100)}%
        </span>

        <li
          className="bg-white rounded-md px-2 py-1 cursor-pointer"
          onClick={() => setZoom((prev) => Math.min(3, prev + 0.1))}
        >
          <i className="fa-solid fa-plus"></i>
        </li>
      </ul>
    </>
  );
};

export default Konva;