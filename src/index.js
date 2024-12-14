import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './Styles/media.css'; // Global media queries
import { AuthProvider } from "./Hooks/useAuth";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);