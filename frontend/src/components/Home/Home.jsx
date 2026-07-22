import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Bottom from "../Bottombar/Bottom";
import Sidebar from "../Sidebar/Sidebar";
import Konva from "../Konva/Konva";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const Home = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const Clear = () =>{
    setLines([]);
    setShapes([]);
    setTexts([]);
    setTables([]);
  }
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
        response = await fetch(`http://localhost:5000/api/boards/${boardId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(boardData)
        });
      } else {
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
      if (!boardId && result) {
        setBoardId(result._id);
        navigate(`/board/${result._id}`, { replace: true });
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

  const [ShareEmail, setShareEmail] = useState("");

  // Share board using EmailJS (Updated to use the dynamic ShareEmail state)
  const shareboard = async () => {
    if (!ShareEmail) return;

    // Pehle board save kar lete hain taaki current link/data updated rahe
    await saveBoard();

    try {
      const templateParams = {
        email: ShareEmail, // Yahan hardcoded email ki jagah user ka entered email pass hoga
        board_name: title || "Untitled Board",
        board_link: window.location.href // Current URL pass karega
      };

      await emailjs.send(
        "service_rl2n529",
        "template_9e47a96",
        templateParams,
        "FN4XnoiwNOEW0HjhN"
      );
      alert(`Board successfully shared with ${ShareEmail}!`);
      setShareEmail("");
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Error in sending email");
    }
  };

  return (
    <>
      <Navbar 
        onSave={saveBoard} 
        title={title} 
        setTitle={setTitle} 
        clear = {Clear}
        ShareEmail={ShareEmail} 
        setShareEmail={setShareEmail} 
        onShareSubmit={shareboard} // Navbar ko function pass kar diya hai
      />
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
        onSave={saveBoard}
      />
    </>
  );
};

export default Home;