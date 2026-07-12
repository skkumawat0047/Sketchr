import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Bottom from "../Bottombar/Bottom";
import Sidebar from "../Sidebar/Sidebar";
import Konva from "../Konva/Konva";

const Home = () => {
  // Tool
  const [tool, setTool] = useState("pen");

  // Nayi States Shapes aur Table selection ke liye
  const [shapeType, setShapeType] = useState("Rect");
  const [tableConfig, setTableConfig] = useState({ type: 'grid', rows: 3, cols: 3 });

  // Drawing Data
  const [lines, setLines] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [texts, setTexts] = useState([]);
  const [tables, setTables] = useState([]);

  // Settings
  const [color, setColor] = useState("#8e47ba");
  const [strokeWidth, setStrokeWidth] = useState(3);

  // --- Undo/Redo Logic ---
  const [history, setHistory] = useState([{ lines: [], shapes: [], texts: [], tables: [] }]);
  const [historyStep, setHistoryStep] = useState(0);

  const handleUndo = () => {
    if (historyStep > 0) {
      const newStep = historyStep - 1;
      setHistoryStep(newStep);
      setLines(history[newStep].lines);
      setShapes(history[newStep].shapes);
      setTexts(history[newStep].texts);
      setTables(history[newStep].tables);
    }
  };

  const handleRedo = () => {
    if (historyStep < history.length - 1) {
      const newStep = historyStep + 1;
      setHistoryStep(newStep);
      setLines(history[newStep].lines);
      setShapes(history[newStep].shapes);
      setTexts(history[newStep].texts);
      setTables(history[newStep].tables);
    }
  };

  const saveHistory = (currentLines, currentShapes, currentTexts, currentTables) => {
    const newState = { lines: currentLines, shapes: currentShapes, texts: currentTexts, tables: currentTables };
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };
  // --- NAYA CODE YAHAN KHATAM ---

  return (
    <>
      <Navbar />
      <Sidebar />

        <Bottom 
        tool={tool} setTool={setTool} 
        texts={texts} setTexts={setTexts} 
        color={color} setColor={setColor} 
        strokeWidth={strokeWidth} setStrokeWidth={setStrokeWidth}
        shapeType={shapeType} setShapeType={setShapeType} // Ye add kiya
        tableConfig={tableConfig} setTableConfig={setTableConfig} // Ye add kiya
         handleUndo={handleUndo} //  /* Ye add karein */
        handleRedo={handleRedo}
      /> 
      
      <Konva 
        tool={tool} 
        lines={lines} setLines={setLines} 
        shapes={shapes} setShapes={setShapes} 
        texts={texts} setTexts={setTexts} 
        tables={tables} setTables={setTables} 
        color={color} 
        strokeWidth={strokeWidth}
        shapeType={shapeType} // Ye add kiya
        tableConfig={tableConfig} // Ye add kiya
        saveHistory={saveHistory}
      />
    </>
  );
};

export default Home;