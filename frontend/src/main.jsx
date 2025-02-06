import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

import "@fontsource/outfit";
import "@fontsource/roboto";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="917719014423-frcr96a77038hja6spoliksuuq5r379g.apps.googleusercontent.com"><App /></GoogleOAuthProvider>
  </StrictMode>,
)
