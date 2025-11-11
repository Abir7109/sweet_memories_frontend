// Build bump to invalidate cached JS on CDN
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

// eslint-disable-next-line no-unused-vars
const __BUILD_BUMP__ = '2025-11-11T10:06:30Z';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
