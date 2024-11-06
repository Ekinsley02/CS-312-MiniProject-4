// import libaries
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// constant for root directory
const root = ReactDOM.createRoot( document.getElementById( 'root') );

// render the app
root.render
  (

  <React.StrictMode>
    <App />
  </React.StrictMode>
  );