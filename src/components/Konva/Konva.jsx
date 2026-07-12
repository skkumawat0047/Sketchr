import React, { useState, useEffect, useRef } from "react";
import { Circle, Layer, Stage, Text, Line } from "react-konva";

const Konva = ({ tool, lines, setLines, texts, setTexts, color, strokeWidth }) => {
  const [zoom, setZoom] = useState(1);
  const [word, setword] = useState("hello");
  const [editingText, setEditingText] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const isDrawing = useRef(false);

  const stageRef = useRef(null);
  const textareaRef = useRef(null);

  // auto-focus of textarea
  useEffect(() => {
    if (editingText) {
      const timer = setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [editingText]);

  const handleMouseDown = (e) => {
    // ---- TEXT TOOL LOGIC ----
    if (tool === "text") {
      const stage = stageRef.current;
      if (!stage) return;
      const pointerPosition = stage.getPointerPosition();
      const stageTransform = stage.getAbsoluteTransform().copy().invert();
      const canvasPos = stageTransform.point(pointerPosition);

      setEditingText({
        canvasX: canvasPos.x,
        canvasY: canvasPos.y,
        screenX: pointerPosition.x,
        screenY: pointerPosition.y,
      });
      return;
    }

    // ---- PEN TOOL LOGIC ----
    if (tool === 'pen' || tool === 'brush' || tool === 'eraser') {
      isDrawing.current = true;
      const stage = e.target.getStage();
      // stageTransform use karein taki zoom hone par bhi sahi jagah draw ho
      const pointerPosition = stage.getPointerPosition();
      const stageTransform = stage.getAbsoluteTransform().copy().invert();
      const pos = stageTransform.point(pointerPosition);

      setLines([...lines, {
        tool: tool,
        points: [pos.x, pos.y],
        // Eraser ke liye solid color zaroori hai (destination-out ke saath)
        color: tool === 'eraser' ? '#ffffff' : color,
        strokeWidth: strokeWidth
      }]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current || (tool !== 'pen' && tool !== 'brush' && tool !== 'eraser')) return;

    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    const stageTransform = stage.getAbsoluteTransform().copy().invert();
    const point = stageTransform.point(pointerPosition);

    let lastLine = lines[lines.length - 1];

    // Naye line ko modify na karke uski copy banayein
    const newLastLine = {
      ...lastLine,
      points: lastLine.points.concat([point.x, point.y])
    };

    const newLines = lines.slice(0, lines.length - 1);
    newLines.push(newLastLine);
    setLines(newLines);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <>
      {editingText && (
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            position: "absolute", left: editingText.screenX, top: editingText.screenY, fontSize: `${20 * zoom}px`, border: "1px solid black", borderRadius: "10px", outline: "none", background: "transparent", color: color, zIndex: 1000,
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              // so that canvas can save text on right position
              setTexts((prev) => [...prev, { x: editingText.canvasX, y: editingText.canvasY, text: inputValue, color, fontSize: 20, },]);
              setEditingText(null);
              setInputValue("");
            }
          }}
        />
      )}

      <div className="relative w-full h-fit border-2 border-gray-400 bg-gray-300 shadow-lg overflow-hidden">
        <Stage
          ref={stageRef}
          width={window.innerWidth}
          height={window.innerHeight}
          scaleX={zoom}
          scaleY={zoom}
          className="bg-white"
          draggable={tool !== "text" && tool !== "pen" && tool !== "brush" && tool !== "eraser"}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <Layer>
            {/* 1. YAHAN CHANGE HAI: Lines ko sabse upar rakha gaya hai taaki wo sabse bottom me draw hon */}
            {lines.map((line, i) => (
              <Line 
                key={i} 
                points={line.points} 
                stroke={line.color} 
                strokeWidth={line.tool === 'brush' ? line.strokeWidth * 3 : line.strokeWidth} 
                opacity={line.tool === 'brush' ? 0.3 : 1}
                tension={0.5} 
                lineCap="round" 
                lineJoin="round" 
                // YAHAN CHANGE HAI: Wapas se asli eraser laga diya gaya hai
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
            
            {/* 3. YAHAN CHANGE HAI: Text sabse aakhir me hai taaki ye hamesha drawing/eraser ke upar dikhe */}
            {texts.map((t, i) => (
              <Text key={i} x={t.x} y={t.y} text={t.text} fill={t.color} fontSize={t.fontSize} draggable />
            ))}
          </Layer>
        </Stage>
      </div>

      {/* Zoom controls */}
      <ul className="fixed right-5 bottom-5 z-50 px-5 py-2 rounded-full bg-gray-200 flex items-center gap-3 shadow-lg">
        <li className="bg-white rounded-md px-1 cursor-pointer" onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.1))}>
          <i className="fa-solid fa-minus"></i>
        </li>
        <span className="w-10 text-center">{Math.round(zoom * 100)}%</span>
        <li className="bg-white rounded-md px-1 cursor-pointer" onClick={() => setZoom((prev) => Math.min(3, prev + 0.1))}>
          <i className="fa-solid fa-plus"></i>
        </li>
      </ul>
    </>
  );
};

export default Konva;