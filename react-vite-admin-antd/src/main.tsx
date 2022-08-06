import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "virtual:windi.css";
import "virtual:windi-devtools";
import "toastify-js/src/toastify.css";
import "antd/dist/antd.css";
import "./assets/styles/app.scss";

const root = document.getElementById("root") as HTMLElement;
if (!root) throw new Error("no root");
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
