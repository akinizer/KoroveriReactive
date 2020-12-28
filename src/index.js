import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter basename="/CaseModel">
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
