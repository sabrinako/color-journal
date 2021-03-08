import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <script src="https://www.gstatic.com/firebasejs/8.2.8/firebase-app.js" />
    <script src="https://www.gstatic.com/firebasejs/8.2.8/firebase-analytics.js" />
    <script src="https://www.gstatic.com/firebasejs/8.2.8/firebase-auth.js" />
    <script src="https://www.gstatic.com/firebasejs/8.2.8/firebase-database.js" />
    <script src="firebase.js" />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
