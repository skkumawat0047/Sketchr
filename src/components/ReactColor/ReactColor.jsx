import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";

const ReactColor = () => {
  const [color, setColor] = useState("#aabbcc");
  const [colorstore, setcolorstore] = useState(["#aabbcc", "#ababab"]);
  const pushcolor = (clr) => {
    if (colorstore.includes(clr)) {
      return;
    } else {
      setcolorstore([...colorstore, clr])
    }
  }
  return (
    <div className="flex">
      <div className="col1">
        <HexColorPicker color={color} onChange={setColor} />
        <div className="value flex gap-2 mt-2">
          <div className="col w-8 h-8 rounded-md" style={{ background: color }}></div><span className="w-16">{color}</span>
          <button className="border-[1px] px-7 rounded-md border-black bg-blue-500 active:bg-green-400" onClick={() => pushcolor(color)}>Pick</button>
        </div>
      </div>
      <div className="col2 max-w-36 max-h-60 flex flex-wrap [&>*]:ml-2 [&>*]:mb-2 overflow-y-auto">
        {colorstore.map((clr) => (
          <span className="col w-8 h-8 rounded-md hover:cursor-pointer" style={{ background: clr }}></span>
        ))}
      </div>
    </div>

  );
};
export default ReactColor
