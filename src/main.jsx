import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx';  // Correct path to App.jsx

// Use ReactDOM.createRoot to initialize the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

