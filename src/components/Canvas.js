/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import Tools from "./Tools";

import {
  StyledCanvas,
  StyledDiv,
  ToolsDiv,
  Div,
  StyledInput,
  GlobalStyle,
} from "./Styles";
const Canvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [color, setColor] = useState("white");
  const [lineWidth, setLineWidth] = useState(2);
  const [drawingHistory, setDrawingHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setContext(ctx);
  }, []);

  const startDrawing = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    setIsDrawing(true);
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    context.lineTo(offsetX, offsetY);
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const updatedDrawingHistory = [...drawingHistory];
    updatedDrawingHistory.push(canvas.toDataURL());
    setDrawingHistory(updatedDrawingHistory);
    setRedoHistory([]);
  };

  const clearCanvas = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    setDrawingHistory([]);
    setRedoHistory([]);
  };

  const redoDrawing = () => {
    if (redoHistory.length > 0) {
      const restoredDrawing = redoHistory.pop();
      const updatedDrawingHistory = [...drawingHistory, restoredDrawing];
      setDrawingHistory(updatedDrawingHistory);
      const canvas = canvasRef.current;
      const image = new Image();
      image.onload = () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.drawImage(image, 0, 0);
      };
      image.src = restoredDrawing;
      setRedoHistory(redoHistory);
    }
  };

  const erase = () => {
    setColor("black"); // Set color to white for erasing
  };

  const undoDrawing = () => {
    if (drawingHistory.length > 0) {
      const undoneDrawing = drawingHistory.pop();
      const updatedRedoHistory = [...redoHistory, undoneDrawing];
      setRedoHistory(updatedRedoHistory);
      const canvas = canvasRef.current;
      const image = new Image();
      image.onload = () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.drawImage(image, 0, 0);
      };
      image.src = drawingHistory[drawingHistory.length - 1];
      setDrawingHistory(drawingHistory);
    }
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    const fileName = prompt("enter a name to save file");
    link.download = `${fileName}`;
    link.download ? alert("saved successfully") : alert("problem");
    link.click();
  };

  return (
    <>
      <GlobalStyle />
      <StyledDiv>
        <StyledCanvas
          ref={canvasRef}
          width={1000}
          height={700}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          title='Start drawing'
        />
        <ToolsDiv>
          <StyledInput
            type='color'
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <StyledInput
            type='range'
            min={1}
            max={20}
            value={lineWidth}
            onChange={(e) => setLineWidth(parseInt(e.target.value))}
          />
          <Div>
            <Tools
              method_props={{
                saveImage_prop: saveImage,
                clearCanvas_prop: clearCanvas,
                erase_prop: erase,
                undo_props: undoDrawing,
                redo_props: redoDrawing,
              }}
            />
          </Div>
        </ToolsDiv>
      </StyledDiv>
    </>
  );
};

export default Canvas;
