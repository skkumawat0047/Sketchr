import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

const Color = ({ color, setColor, tool, setTool, prevToolRef }) => {
  const [colorStore, setColorStore] = useState(() => {
    const savedColors = localStorage.getItem("sketchr_colors");
    if (savedColors) {
      return JSON.parse(savedColors);
    }
    return [
      { id: 1, hexValue: "#aabbcc" },
      { id: 2, hexValue: "#ababab" },
    ];
  });

  useEffect(() => {
    localStorage.setItem("sketchr_colors", JSON.stringify(colorStore));
  }, [colorStore]);

  const saveColor = (selectedColor) => {
    const isColorExist = colorStore.some((item) => item.hexValue === selectedColor);
    if (isColorExist) return;
    setColorStore([...colorStore, { id: Date.now(), hexValue: selectedColor }]);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  // Jab color par click karke finalize karein, tab turant purane tool par chale jao
  const applyColorAndSwitchTool = (hex) => {
    setColor(hex);
    const targetTool = prevToolRef.current || 'pen';
    setTool(targetTool);
  };

  return (
    <div className="border-2 border-black w-[370px] bg-sky-200 rounded-lg p-3 shadow-2xl">
      <div className="w-full">
        <div className="flex gap-4">

          {/* ----- LEFT SIDE: Color Picker ----- */}
          <div className="flex flex-col w-[200px]" onMouseDown={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
            <HexColorPicker
              color={color}
              onChange={handleColorChange}
              style={{ width: "100%", height: "150px" }}
            />

            <div className="flex items-center justify-between gap-2 mt-3 w-full">
              <div
                className="w-8 h-8 rounded-md border border-gray-400 shrink-0"
                style={{ backgroundColor: color }}
              ></div>

              <span className="w-16 text-sm font-semibold truncate text-center">{color}</span>

              <button
                className="border-[1px] px-3 py-1 rounded-md border-black bg-blue-500 text-white font-medium hover:bg-blue-600 active:bg-green-400 transition-colors"
                onClick={() => {
                  saveColor(color);
                  applyColorAndSwitchTool(color);
                }}
              >
                Select
              </button>
            </div>
          </div>

          {/* ----- RIGHT SIDE: Saved Colors ----- */}
          <div className="flex-1 max-h-[190px] flex flex-wrap content-start overflow-y-auto pr-1">
            {colorStore.map((clr) => (
              <span
                key={clr.id}
                className="w-8 h-8 rounded-md m-1 cursor-pointer border border-gray-400 hover:scale-110 transition-transform shrink-0"
                style={{ backgroundColor: clr.hexValue }}
                onClick={() => applyColorAndSwitchTool(clr.hexValue)}
                title={clr.hexValue}
              ></span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Color;