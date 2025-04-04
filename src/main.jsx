import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CursorProvider } from './CursorContext'; // Импортируем CursorProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CursorProvider>
      <App />
    </CursorProvider>
  </React.StrictMode>
);
