import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './Redux/appSlice';
import './index.css';
import App from './App';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

const container = document.getElementById('root');

// Новый код рендера - начиная с реакт 18 https://github.com/reactwg/react-18/discussions/5

if (container)
{

    const root = ReactDOMClient.createRoot(container);

    root.render(
      <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
    );
}


/*
Старый код рендера
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);*/