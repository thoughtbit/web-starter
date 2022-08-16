import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import NiceModal from "@ebay/nice-modal-react";
import App from "./App";

import "antd/dist/antd.css";
import "toastify-js/src/toastify.css";
import "./assets/styles/app.scss";

const ErrorFallback = () => {
  return (
    <div className="" role="alert">
      <h2 className="">哎呀，出问题了 :( </h2>
      <button className="" onClick={() => window.location.assign(window.location.origin)}>
        刷新
      </button>
    </div>
  );
};

function renderApp() {
  const root = document.getElementById("root") as HTMLElement;
  if (!root) throw new Error("找不到root钩子");
  const app = createRoot(root);
  app.render(
    <React.StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <NiceModal.Provider>
          <Router>
            <App />
          </Router>
        </NiceModal.Provider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

renderApp();
