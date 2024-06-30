import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'sonner';
import GoogleAuthProvider from './provider/googleAuthProvider/google-auth-provider';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.Fragment>
    <Toaster></Toaster>
    <GoogleAuthProvider>
      <App />
    </GoogleAuthProvider>
  </React.Fragment>
);

