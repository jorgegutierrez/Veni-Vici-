import { createRoot } from 'react-dom';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';

// Utiliza createRoot en lugar de ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
