import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; 

import App from './App';

const queryClient = new QueryClient();

function renderApp() {
  const root = document.getElementById('root') as HTMLElement;
  if (!root) throw new Error('找不到root钩子');
  const app = createRoot(root);
  app.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

renderApp();
