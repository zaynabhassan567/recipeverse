import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
); 