import React from 'react';
import ReactDOM from 'react-dom/client';

import ErrorBoundary from './layouts/ErrorBoundary';
import { App } from '@/pages';

import './global.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
