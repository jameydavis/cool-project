import React from "react";
import { createRoot } from "react-dom/client";
import { Theme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";
import { App } from "./astryx/App";

const propsElement = document.getElementById("astryx-props");
const props = propsElement ? JSON.parse(propsElement.textContent) : {};

createRoot(document.getElementById("astryx-root")).render(
  <Theme theme={neutralTheme}>
    <App {...props} />
  </Theme>
);
