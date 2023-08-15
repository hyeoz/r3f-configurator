import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { App as Canvas } from "./Canvas";
import { Overlay } from "./Overlay";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <Canvas />
    <Overlay />
  </>
);
