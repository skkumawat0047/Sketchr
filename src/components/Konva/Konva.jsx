import React, { useState } from "react";
import { Circle, Image, Layer, Stage } from "react-konva";

const Konva = () => {
  const [zoom, setZoom] = useState(1.5);

  return (
    <>
      <div className="Konva bg-red-100 w-full h-screen flex justify-center items-center">
        <div className="box w-[71%] h-[70%] flex justify-center items-center overflow-hidden">
          <Stage width={1000} height={700} scaleX={zoom} scaleY={zoom} className="bg-white" >
            <Layer>
              <Circle
                x={100}
                y={100}
                radius={30}
                stroke={"black"}
                strokeWidth={2}
                draggable
              />
            </Layer>
          </Stage>
        </div>
      </div>

      <ul className="fixed right-5 bottom-2 z-50 px-5 py-2 rounded-full bg-gray-200 flex items-center gap-3">
        <li
          className="bg-white rounded-md px-2 py-1 cursor-pointer active:bg-slate-400"
          onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.1))}
        >
          <i className="fa-solid fa-minus"></i>
        </li>

        <span className="w-10 text-center">
          {Math.round(zoom * 100)}%
        </span>

        <li
          className="bg-white rounded-md px-2 py-1 cursor-pointer active:bg-slate-400"
          onClick={() => setZoom((prev) => Math.min(5, prev + 0.1))}
        >
          <i className="fa-solid fa-plus"></i>
        </li>
      </ul>
    </>
  );
};

export default Konva;