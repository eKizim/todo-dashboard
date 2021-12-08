import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store.jsx';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './style.css';

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
