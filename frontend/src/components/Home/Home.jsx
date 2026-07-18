import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Bottom from "../Bottombar/Bottom";
import Sidebar from "../Sidebar/Sidebar";
import Konva from "../Konva/Konva";
import { useParams } from "react-router-dom";


const Home = () => {

  const { id } = useParams();
  // Tool
  const [title,setTitle] = useState("Untitled board")
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

  // sending data to backend using api
  const [boardId, setBoardId] = useState(id || null);
  const saveBoard = async () => {
    try {
      const boardData = {
        title: title,
        owner: localStorage.getItem("userId"),
        elements: {
          lines,
          shapes,
          texts,
          tables
        }
      };

      let response;
      if (boardId) {
        // Update Existing Board
        console.log(boardId)
        // response = await fetch(`https://sketchr.onrender.com/api/boards/${boardId}`, {
        response = await fetch(`http://localhost:5000/api/boards/${boardId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(boardData)
        });
      } else {
        // Create New Board
        // response = await fetch("https://sketchr.onrender.com/api/boards/createboard", {
        response = await fetch("http://localhost:5000/api/boards/createboard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(boardData)
        });
      }

      const result = await response.json();
      console.log(result);
      // Agar naya board create hua hai to uska id save kar lo
      if (!boardId && result) {
        setBoardId(result._id);
      }
      alert(result._id ? "Board Saved" : "Error Saving Board");
    } catch (err) {
      console.log(err);
    }
  };

  //fetching data of existing board using api
  const getBoard = async (id) => {
    try {
      // const response = await fetch(`https://sketchr.onrender.com/api/boards/${id}`);
      const response = await fetch(`http://localhost:5000/api/boards/${id}`);

      if (!response.ok) {
        throw new Error("Board not found");
      }

      const data = await response.json();
      console.log("respose: ", data)
      setLines(data.elements.lines || []);
      setShapes(data.elements.shapes || []);
      setTexts(data.elements.texts || []);
      setTables(data.elements.tables || []);

      setBoardId(data._id);

      setHistory([
        {
          lines: data.elements.lines || [],
          shapes: data.elements.shapes || [],
          texts: data.elements.texts || [],
          tables: data.elements.tables || [],
        },
      ]);
      setHistoryStep(0);
      alert("Board Loaded Successfully");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (id) {
      getBoard(id);
    }
  }, [id]);

  return (
    <>
      <Navbar onSave={saveBoard} title={title} setTitle={setTitle} />
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