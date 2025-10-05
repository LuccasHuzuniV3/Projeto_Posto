import React from 'react';
import ReactDOM from 'react-dom/client';  // Alterado para a nova API
import App from './app';
import './css/app.css';  // Caso você tenha um arquivo CSS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
