import React, { StrictMode } from 'react';
import { ColorModeScript } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <StrictMode>
      <ColorModeScript />
      <App />
    </StrictMode>
  </BrowserRouter>
);
