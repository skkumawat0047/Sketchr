import React, { useState } from "react";

const Canvas = () => {
  const [size, setSize] = useState(50);

  return (
    <>
      <div className="canvas bg-red-100 w-full h-screen flex justify-center items-center">
        <div className="box w-[70%] h-[75%] bg-yellow-300 flex justify-center items-center overflow-auto">
          <canvas
            className="bg-blue-200"
            style={{
              width: `${size}%`,
              height: `${size}%`,
            }}
          />
        </div>
      </div>

      <ul className="fixed right-5 bottom-2 z-50 px-5 py-2 rounded-full bg-gray-200 flex items-center gap-3">
        <li className="bg-white rounded-md px-2 py-1 cursor-pointer active:bg-slate-400"
          onClick={() => setSize((prev) => Math.max(25, prev - 1))}
        >
          <i className="fa-solid fa-minus"></i>
        </li>

        <span className="w-10 text-center">{size}%</span>

        <li
          className="bg-white rounded-md px-2 py-1 cursor-pointer active:bg-slate-400"
          onClick={() => setSize((prev) => Math.min(300, prev + 1))}
        >
          <i className="fa-solid fa-plus"></i>
        </li>
      </ul>
    </>
  );
};

export default Canvas;