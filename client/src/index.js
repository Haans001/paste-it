import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/main.scss';
import App from './App';
import SnackbarProvider from './context/SnackbarProvider/SnackbarProvider';

ReactDOM.render(
    <React.StrictMode>
        <SnackbarProvider>
            <App />
        </SnackbarProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
