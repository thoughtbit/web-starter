import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "@/components";
import App from "./App";

function renderApp() {
  const root = document.getElementById("root") as HTMLElement;
  if (!root) throw new Error("找不到root钩子");
  const app = ReactDOM.createRoot(root);
  app.render(
    <React.StrictMode>
      <ErrorBoundary>
        <Router>
          <App />
        </Router>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

renderApp();
