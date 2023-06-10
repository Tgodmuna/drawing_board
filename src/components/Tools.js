import React from "react";
import { Button } from "./Styles";
const Tools = (prop) => {
  return (
    <div>
      <Button onClick={prop.method_props.clearCanvas_prop}>Clear</Button>
      <Button onClick={prop.method_props.redo_props}>Redo</Button>
      <Button onClick={prop.method_props.erase_prop}>Eraser</Button>
      <Button onClick={prop.method_props.undo_props}>Undo</Button>
      <Button onClick={prop.method_props.saveImage_prop}>Save</Button>
    </div>
  );
};

export default Tools;
