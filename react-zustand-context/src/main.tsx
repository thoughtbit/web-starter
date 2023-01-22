import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

function renderApp() {
  const root = document.getElementById('root') as HTMLElement;
  if (!root) throw new Error('找不到root钩子');
  const app = createRoot(root);
  app.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  );
}

renderApp();
