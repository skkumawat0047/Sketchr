import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

const Color = ({ color, setColor }) => {
  // 1. Component load hote waqt hum check karenge ki kya LocalStorage me purane colors hain?
  const [colorStore, setColorStore] = useState(() => {
    const savedColors = localStorage.getItem("sketchr_colors");
    if (savedColors) {
      return JSON.parse(savedColors); // Agar hain to unhe load kar lo
    }
    // Agar nahi hain (pehli baar open kiya hai) to ye default colors de do
    return [
      { id: 1, hexValue: "#aabbcc" },
      { id: 2, hexValue: "#ababab" },
    ];
  });

  // 2. useEffect tab chalega jab bhi 'colorStore' me koi naya color add hoga
  // Ye har naye color ko turant LocalStorage me hamesha ke liye save kar dega
  useEffect(() => {
    localStorage.setItem("sketchr_colors", JSON.stringify(colorStore));
  }, [colorStore]);

  const saveColor = (selectedColor) => {
    // Agar color already hai to save na karein
    const isColorExist = colorStore.some((item) => item.hexValue === selectedColor);

    if (isColorExist) {
      return;
    } else {
      // Naya color list me add karein
      setColorStore([...colorStore, { id: Date.now(), hexValue: selectedColor }]);
    }
  };

  return (
    <div className="border-2 border-black w-[370px] bg-sky-200 rounded-lg p-3">
      <div className="w-full">
        <div className="flex gap-4">

          {/* ----- LEFT SIDE: Color Picker ----- */}
          <div className="flex flex-col w-[200px]">
            <HexColorPicker
              color={color}
              onChange={setColor}
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
                onClick={() => saveColor(color)}
              >
                Save
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
                onClick={() => setColor(clr.hexValue)}
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