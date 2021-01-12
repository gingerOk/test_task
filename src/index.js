import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {UserProvider} from "contexts/UserContext"
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
    <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

