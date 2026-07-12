import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";

const Color = ({ color, setColor }) => {
  const [colorStore, setColorStore] = useState([
    { id: 1, hexValue: "#aabbcc" },
    { id: 2, hexValue: "#ababab" },
  ]);

  // Ye function naye color ko colorStore me save karne ke liye hai
  const saveColor = (selectedColor) => {
    const isColorExist = colorStore.some((item) => item.hexValue === selectedColor);

    if (isColorExist) {
      return; 
    } else {
      setColorStore([...colorStore, { id: Date.now(), hexValue: selectedColor }]);
    }
  };

  return (
    <div className="border-2 border-black w-auto bg-sky-200 rounded-lg p-3">
      <div className="min-w-80">
        <div className="flex gap-4">
          
          {/* ----- LEFT SIDE: Color Picker aur Current Color Info ----- */}
          <div className="flex flex-col">
            {/* React-Colorful ka component jo color choose karne me madad karta hai */}
            <HexColorPicker color={color} onChange={setColor} />
            
            {/* Niche wala section jo current selected color aur uski Hex Value dikhata hai */}
            <div className="flex items-center gap-2 mt-3">
              {/* Ek chota sa box jo current color dikhayega */}
              <div 
                className="w-8 h-8 rounded-md border border-gray-400" 
                style={{ "background": color }}
              ></div>
              
              {/* Color ki Hex string (e.g., #ff0000) */}
              <span className="w-16 text-sm font-semibold">{color}</span>
              
              {/* "Pick" button jise click karne par current color list me save ho jayega */}
              <button
                className="border-[1px] px-5 py-1 rounded-md border-black bg-blue-500 text-white font-medium hover:bg-blue-600 active:bg-green-400 transition-colors"
                onClick={() => saveColor(color)}
              >
                Save
              </button>
            </div>
          </div>
          
          {/* ----- RIGHT SIDE: Saved Colors ki List ----- */}
          <div className="max-w-36 max-h-60 flex flex-wrap content-start overflow-y-auto">
            {colorStore.map((clr) => (
              <span
                key={clr.id} // React list ke liye unique key zaroori hai
                // className me 'border-gray-400' lagaya hai taaki safed (white) color easily dikh sake
                className="w-8 h-8 rounded-md m-1 cursor-pointer border border-gray-400 hover:scale-110 transition-transform"
                style={{ background: clr.hexValue }} 
                // Jab bhi user saved color par click karega, to wo color canvas (Konva) me apply ho jayega
                onClick={() => setColor(clr.hexValue)} 
                title={clr.hexValue} // Hover karne par color code tooltip me dikhega
              ></span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Color;