import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Bottom from "../Bottombar/Bottom";
import Sidebar from "../Sidebar/Sidebar";
import Konva from "../Konva/Konva";

const Home = () => {
  // Tool
  const [tool, setTool] = useState("pen");

  // Drawing Data
  const [lines, setLines] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [texts, setTexts] = useState([]);
  const [tables, setTables] = useState([]);

  // Settings
  const [color, setColor] = useState("#8e47ba");
  const [strokeWidth, setStrokeWidth] = useState(3);

  return (
    <>
      <Navbar />
      <Sidebar />

      <Bottom tool={tool} setTool={setTool} texts={texts} setTexts={setTexts} color={color} setColor={setColor} strokeWidth={strokeWidth} setStrokeWidth={setStrokeWidth}
      /> 
      <Konva tool={tool} lines={lines} setLines={setLines} shapes={shapes} setShapes={setShapes} texts={texts} setTexts={setTexts} tables={tables} setTables={setTables} color={color} strokeWidth={strokeWidth}
      />
    </>
  );
};

export default Home;