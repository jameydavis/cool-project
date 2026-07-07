import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./astryx/App";

const propsElement = document.getElementById("astryx-props");
const props = propsElement ? JSON.parse(propsElement.textContent) : {};

createRoot(document.getElementById("astryx-root")).render(<App {...props} />);
