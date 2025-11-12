//index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';


/** Redux Store */
import store from './redux/store';
import { Provider } from 'react-redux';
import axios from 'axios';

/** Configure axios base URL */
axios.defaults.baseURL = 'http://localhost:3000/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
