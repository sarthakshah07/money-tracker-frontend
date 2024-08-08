import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// import store from './store/store';
import App from './App';
import './index.css';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from './utils/utils';
import { store } from './redux';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <ThemeProvider theme={darkTheme} notched={"false"}>
        <App />
      </ThemeProvider>
      <SnackbarProvider/>
    </Provider>
);

