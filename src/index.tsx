import React from 'react';
import ReactDOM from 'react-dom/client';
import 'instantsearch.css/themes/reset.css';
import 'instantsearch.css/themes/satellite.css';
import './index.css';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
