import React from 'react';
import ReactDOM from 'react-dom/client'; // 변경된 부분
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // 변경된 부분
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
