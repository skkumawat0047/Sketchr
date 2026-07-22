import React, { useState, useEffect, useRef } from "react";
import { Layer, Stage, Text, Line, Rect, Circle, Ellipse, RegularPolygon, Arrow, Group } from "react-konva";

const Konva = ({ tool, lines, setLines, shapes, setShapes, texts, setTexts, tables, setTables, color, strokeWidth, shapeType, tableConfig, saveHistory, onSave }) => {
  const [zoom, setZoom] = useState(1);
  const [editingText, setEditingText] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const isDrawing = useRef(false);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const stageRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (editingText) {
      const timer = setTimeout(() => textareaRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [editingText]);

  const handleMouseDown = (e) => {
    // Agar mover tool selected hai, to draw karne ka logic chalane ki zaroorat nahi hai
    if (tool === 'mover') return;

    const currentZIndex = Date.now();

    if (tool === "text") {
      const stage = stageRef.current;
      const pointerPosition = stage.getPointerPosition();
      const stageTransform = stage.getAbsoluteTransform().copy().invert();
      const canvasPos = stageTransform.point(pointerPosition);
      setEditingText({ canvasX: canvasPos.x, canvasY: canvasPos.y, screenX: pointerPosition.x, screenY: pointerPosition.y, zIndex: currentZIndex });
      return;
    }

    isDrawing.current = true;
    document.body.style.cursor = tool === 'eraser' ? 'cell' : 'crosshair';
    document.body.style.userSelect = 'none';

    const stage = stageRef.current || e.target.getStage();
    const pos = stage.getAbsoluteTransform().copy().invert().point(stage.getPointerPosition());

    if (tool === 'pen' || tool === 'brush' || tool === 'eraser') {
      setLines(prev => [...prev, { tool, points: [pos.x, pos.y], color: tool === 'eraser' ? '#ffffff' : color, strokeWidth, zIndex: currentZIndex }]);
    }
    else if (tool === 'shape') {
      setShapes(prev => [...prev, { type: shapeType, x: pos.x, y: pos.y, width: 0, height: 0, color, strokeWidth, zIndex: currentZIndex }]);
    }
    else if (tool === 'table') {
      if (tableConfig) {
        setTables(prev => [...prev, { x: pos.x, y: pos.y, width: 0, height: 0, rows: tableConfig.rows, cols: tableConfig.cols, color, strokeWidth, zIndex: currentZIndex }]);
      }
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isDrawing.current || tool === 'mover' || !stageRef.current) return;
      const stage = stageRef.current;
      const stageTransform = stage.getAbsoluteTransform().copy().invert();
      const point = stageTransform.point({ x: e.clientX, y: e.clientY });

      if (tool === 'pen' || tool === 'brush' || tool === 'eraser') {
        setLines(prevLines => {
          if (prevLines.length === 0) return prevLines;
          const lastLine = prevLines[prevLines.length - 1];
          return [...prevLines.slice(0, -1), {
            ...lastLine,
            points: [...lastLine.points, point.x, point.y]
          }];
        });
      }
      else if (tool === 'shape') {
        setShapes(prevShapes => {
          if (prevShapes.length === 0) return prevShapes;
          const lastShape = prevShapes[prevShapes.length - 1];
          return [...prevShapes.slice(0, -1), {
            ...lastShape,
            width: point.x - lastShape.x,
            height: point.y - lastShape.y
          }];
        });
      }
      else if (tool === 'table') {
        setTables(prevTables => {
          if (prevTables.length === 0) return prevTables;
          const lastTable = prevTables[prevTables.length - 1];
          return [...prevTables.slice(0, -1), {
            ...lastTable,
            width: point.x - lastTable.x,
            height: point.y - lastTable.y
          }];
        });
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDrawing.current) {
        isDrawing.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        saveHistory(lines, shapes, texts, tables);
        if (onSave && typeof onSave === "function") {
          onSave();
        }
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [tool, lines, shapes, texts, tables, onSave, saveHistory]);

  const handleMouseMove = (e) => {
    if (!isDrawing.current || tool === 'mover') return;
    const stage = e.target.getStage();
    const point = stage.getAbsoluteTransform().copy().invert().point(stage.getPointerPosition());

    if (tool === 'pen' || tool === 'brush' || tool === 'eraser') {
      let lastLine = { ...lines[lines.length - 1] };
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      setLines([...lines.slice(0, lines.length - 1), lastLine]);
    }
    else if (tool === 'shape') {
      let lastShape = { ...shapes[shapes.length - 1] };
      lastShape.width = point.x - lastShape.x;
      lastShape.height = point.y - lastShape.y;
      setShapes([...shapes.slice(0, shapes.length - 1), lastShape]);
    }
    else if (tool === 'table') {
      let lastTable = { ...tables[tables.length - 1] };
      lastTable.width = point.x - lastTable.x;
      lastTable.height = point.y - lastTable.y;
      setTables([...tables.slice(0, tables.length - 1), lastTable]);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing.current && tool !== 'mover') {
      saveHistory(lines, shapes, texts, tables);
      if (onSave && typeof onSave === "function") {
        onSave();
      }
    }
    isDrawing.current = false;
  };

  const renderTable = (tbl, i) => {
    if (!tbl.rows || !tbl.cols || Math.abs(tbl.width) < 1 || Math.abs(tbl.height) < 1) return null;
    const rowHeight = tbl.height / tbl.rows;
    const colWidth = tbl.width / tbl.cols;
    const gridLines = [];
    for (let r = 0; r <= tbl.rows; r++) {
      gridLines.push(<Line key={`h${r}`} points={[0, r * rowHeight, tbl.width, r * rowHeight]} stroke={tbl.color} strokeWidth={tbl.strokeWidth} />);
    }
    for (let c = 0; c <= tbl.cols; c++) {
      gridLines.push(<Line key={`v${c}`} points={[c * colWidth, 0, c * colWidth, tbl.height]} stroke={tbl.color} strokeWidth={tbl.strokeWidth} />);
    }
    return <Group key={i} x={tbl.x} y={tbl.y}>{gridLines}</Group>;
  };

  const allElements = [
    ...lines.map(l => ({ ...l, itemType: 'line' })),
    ...shapes.map(s => ({ ...s, itemType: 'shape' })),
    ...tables.map(t => ({ ...t, itemType: 'table' })),
    ...texts.map(t => ({ ...t, itemType: 'text' }))
  ].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

  const getCursorStyle = () => {
    if (tool === 'mover') return 'grab';
    if (tool === 'eraser') return 'cell';
    if (tool === 'pen' || tool === 'brush') return 'crosshair';
    if (tool === 'text') return 'text';
    return 'crosshair';
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
              const newTexts = [...texts, { x: editingText.canvasX, y: editingText.canvasY, text: inputValue, color, fontSize: 20, zIndex: editingText.zIndex },];
              setTexts(newTexts);
              saveHistory(lines, shapes, newTexts, tables);
              setEditingText(null);
              setInputValue("");
            }
          }}
        />
      )}

      <div className="bg-gray-300 overflow-hidden fixed inset-0">
        <Stage
          ref={stageRef}
          width={dimensions.width}
          height={dimensions.height}
          scaleX={zoom}
          scaleY={zoom}
          className="bg-white"
          draggable={tool === "mover"}
          style={{ cursor: getCursorStyle() }}

          onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown} onTouchMove={handleMouseMove} onTouchEnd={handleMouseUp}
        >
          <Layer>
            {allElements.map((el, i) => {
              if (el.itemType === 'line') {
                return (
                  <Line
                    key={`line-${i}`} points={el.points} stroke={el.color}
                    strokeWidth={el.tool === 'brush' ? el.strokeWidth * 3 : el.strokeWidth}
                    opacity={el.tool === 'brush' ? 0.3 : 1} tension={0.5} lineCap="round" lineJoin="round"
                    globalCompositeOperation={el.tool === 'eraser' ? 'destination-out' : 'source-over'}
                  />
                );
              }
              if (el.itemType === 'shape') {
                if (Math.abs(el.width) < 1 && Math.abs(el.height) < 1) return null;
                const radius = Math.sqrt(el.width * el.width + el.height * el.height);

                if (el.type === 'Rect') return <Rect key={`shape-${i}`} x={el.x} y={el.y} width={el.width} height={el.height} stroke={el.color} strokeWidth={el.strokeWidth} />;
                if (el.type === 'Circle') return <Circle key={`shape-${i}`} x={el.x} y={el.y} radius={radius} stroke={el.color} strokeWidth={el.strokeWidth} />;
                if (el.type === 'Ellipse') return <Ellipse key={`shape-${i}`} x={el.x} y={el.y} radiusX={Math.abs(el.width)} radiusY={Math.abs(el.height)} stroke={el.color} strokeWidth={el.strokeWidth} />;
                if (el.type === 'Arrow') return <Arrow key={`shape-${i}`} points={[el.x, el.y, el.x + el.width, el.y + el.height]} stroke={el.color} strokeWidth={el.strokeWidth} fill={el.color} />;
                if (el.type === 'Pentagon' || el.type === 'Hexagon' || el.type === 'Octagon') {
                  const sides = el.type === 'Pentagon' ? 5 : el.type === 'Hexagon' ? 6 : 8;
                  return <RegularPolygon key={`shape-${i}`} x={el.x} y={el.y} sides={sides} radius={radius} stroke={el.color} strokeWidth={el.strokeWidth} />;
                }
                return null;
              }
              if (el.itemType === 'table') {
                return renderTable(el, `table-${i}`);
              }
              if (el.itemType === 'text') {
                return <Text key={`text-${i}`} x={el.x} y={el.y} text={el.text} fill={el.color} fontSize={el.fontSize} draggable={tool === 'mover'} />;
              }
              return null;
            })}
          </Layer>
        </Stage>
      </div>

      {/* Zoom controls */}
      <div className="fixed right-5 bottom-5 z-50 px-3 py-2 rounded-xl bg-gray-200 flex items-center gap-2 shadow-lg select-none">
        <span className="text-gray-600 font-medium text-xs">Zoom</span>

        <input
          type="range"
          min="0.5"
          max="3"
          step="0.1"
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-24 h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />

        <span className="w-10 text-center font-bold text-gray-800 text-xs">
          {Math.round(zoom * 50)}%
        </span>
      </div>
    </>
  );
};

export default Konva;