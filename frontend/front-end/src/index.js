import React from 'react';
import ReactDOM from 'react-dom/client';  // Alterado para a nova API
import App from './app';
import './css/app.css';  // Caso você tenha um arquivo CSS
import { AuthProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
          <App />
    </AuthProvider>
  </React.StrictMode>
);
