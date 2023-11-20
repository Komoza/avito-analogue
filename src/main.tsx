import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './global-styles.scss';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './hooks/scroll-to-top.ts';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ScrollToTop />
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
