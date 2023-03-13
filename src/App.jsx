import { useState } from "react";
import "./App.css";

function App() {
  const [shapes, setShapes] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedShape, setSelectedShape] = useState("circle");
  const handleClick = (e) => {
    const newCircle = { type: selectedShape, x: e.clientX, y: e.clientY };
    setShapes((prev) => [...prev, newCircle]);
  };
  const handleClear = (e) => {
    e.stopPropagation();
    setShapes([]);
  };
  const handleUndo = (e) => {
    e.stopPropagation();
    if (shapes.length < 1) return;
    const update = [...shapes];
    const undo = update.pop();
    setHistory([...history, undo]);
    setShapes(update);
  };
  const handleRedo = (e) => {
    e.stopPropagation();
    if (history.length < 1) return;
    const prevHistory = [...history];
    const redo = prevHistory.pop();
    setHistory(prevHistory);
    setShapes((prev) => [...prev, redo]);
  };
  return (
    <div className="App">
      <div className="header">
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>redo</button>
        <div
          id="circle"
          onClick={(e) => {
            setSelectedShape(e.target.id);
          }}
          className="circle select-option"
        ></div>
        <div
          id="square"
          onClick={(e) => {
            setSelectedShape(e.target.id);
          }}
          className="square select-option"
        ></div>
      </div>
      <div onClick={handleClick} className="canvas">
        {shapes?.length > 0 &&
          shapes.map((s, i) => <Shape key={i} shape={s} />)}
      </div>
    </div>
  );
}

function Shape({ shape }) {
  return (
    <div
      className={shape.type}
      style={{ top: shape.y + "px", left: shape.x + "px" }}
    ></div>
  );
}

export default App;
