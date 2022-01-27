import React from "react";
import ReactDOM from "react-dom";
import { initMocks } from "./mocks";
import App from "./App";
import "virtual:windi.css";
import "virtual:windi-devtools";
import "@/assets/styles/index.scss";

if (import.meta.env.MODE === "development") {
  initMocks();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
