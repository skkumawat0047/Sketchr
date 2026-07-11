import React, { useState } from "react";
import { Circle, Layer, Rect, Stage, Text } from "react-konva";


const Konva = ({ tool, lines, setLines, shapes, setShapes, texts, setTexts, tables, setTables, color, strokeWidth }) => {
  const [zoom, setZoom] = useState(1);
  const [word, setword] = useState("hello")
  const [editingText, setEditingText] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleStageClick = (e) => {
    if (tool !== "text") return;

    const pos = e.target.getStage().getPointerPosition();
    console.log(tool, pos);
    setEditingText({
      x: pos.x,
      y: pos.y,
    });
  };
  return (
    <>
      {editingText && (
        <textarea
          autoFocus
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            position: "absolute",
            left: editingText.x,
            top: editingText.y,
            fontSize: "20px",
            border: "2px solid black",
            outline: "none",
            background: "transparent",
            color: color,
            zIndex: 1000,
          }}

          onKeyDown={(e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    setTexts((prev) => [
      ...prev,
      {
        x: editingText.x,
        y: editingText.y,
        text: inputValue,
        color,
        fontSize: 20,
      },
    ]);

    setEditingText(null);
    setInputValue("");
  }
}}
        />
      )};
      <div className="relative w-full h-full border-2 border-gray-400 bg-gray-300 shadow-lg">
        <Stage width={window.innerWidth} height={window.innerHeight} scaleX={zoom} scaleY={zoom} className="bg-white" draggable onMouseDown={handleStageClick}>
          <Layer>
            <Circle x={350} y={350} radius={100} stroke="black" strokeWidth={2} draggable />
            <Text x={15} y={15} text={word} fontSize={30} fontFamily="Calibri" fill="black" offsetX={60} draggable />
            {texts.map((t, i) => (
              <Text key={i} x={t.x} y={t.y} text={t.text} fill={t.color} fontSize={t.fontSize} draggable />
            ))}
          </Layer>
        </Stage>
      </div>



      {/*  Zoom controls */}
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
