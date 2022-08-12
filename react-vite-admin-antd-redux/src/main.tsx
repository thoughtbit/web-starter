import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import NiceModal from "@ebay/nice-modal-react";
import App from "./App";
import { store } from "./store";

import "antd/dist/antd.css";
import "toastify-js/src/toastify.css";
import "./assets/styles/app.scss";
import "virtual:windi.css";
import "virtual:windi-devtools";


const ErrorFallback = () => {
  return (
    <div className="text-red-500 w-screen h-screen flex flex-col justify-center items-center" role="alert">
      <h2 className="text-lg font-semibold">哎呀，出问题了 :( </h2>
      <button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
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
        <Provider store={store}>
          <NiceModal.Provider>
            <Router>
              <App />
            </Router>
          </NiceModal.Provider>
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

renderApp();
