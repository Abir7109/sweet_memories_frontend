// Build bump to invalidate cached JS on CDN (must have a side effect)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

// Expose a build marker to avoid tree-shaking and change bundle hash
window.__BUILD_BUMP__ = '2025-11-11T10:50:00Z';
// eslint-disable-next-line no-console
console.log('Sweet Memories build:', window.__BUILD_BUMP__);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
