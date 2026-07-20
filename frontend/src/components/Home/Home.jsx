import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Bottom from "../Bottombar/Bottom";
import Sidebar from "../Sidebar/Sidebar";
import Konva from "../Konva/Konva";
import { useParams } from "react-router-dom";
import { useNavigate} from "react-router-dom";

const Home = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // FIX 1: Start with an empty string so the placeholder can show up on new boards
  const [title, setTitle] = useState(""); 
  const [tool, setTool] = useState("pen");

  // States for Shapes and Table selection
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

  // Sending data to backend using api
  const [boardId, setBoardId] = useState(id || null);
  
  const saveBoard = async () => {
    try {
      const boardData = {
        // Fallback to "Untitled Board" in DB if user leaves it completely blank
        title: title.trim() === "" ? "Untitled Board" : title,
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
        response = await fetch(`http://localhost:5000/api/boards/${boardId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(boardData)
        });
      } else {
        // Create New Board
        response = await fetch("http://localhost:5000/api/boards/createboard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(boardData)
        });
      }

      const result = await response.json();
      console.log(result)
      if (!boardId && result) {
        setBoardId(result._id);
        navigate(`/board/${result._id}`,{replace:true});
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Fetching data of existing board using api
  const getBoard = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/boards/${id}`);

      if (!response.ok) {
        throw new Error("Board not found");
      }

      const data = await response.json();
      console.log(data);
      // FIX 2: Set the actual loaded board title into state here!
      setTitle(data.title || ""); 
      
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
    } catch (err) {
      console.log(err);
    }
  };

  // Trigger loading when ID exists, or wipe states clean when route changes back to a new board
  useEffect(() => {
    if (id) {
      getBoard(id);
    } else {
      setTitle(""); 
      setBoardId(null);
      setLines([]);
      setShapes([]);
      setTexts([]);
      setTables([]);
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
        shapeType={shapeType} setShapeType={setShapeType}
        tableConfig={tableConfig} setTableConfig={setTableConfig}
        handleUndo={handleUndo}
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
        shapeType={shapeType}
        tableConfig={tableConfig}
        saveHistory={saveHistory}
        onSave = {saveBoard}
      />
    </>
  );
};

export default Home;