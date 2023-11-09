import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './global-styles.scss';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './hooks/scroll-to-top.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ScrollToTop />
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
