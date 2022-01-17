import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import AppN from "./AppN"
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
    {/* <AppN /> */}
    <App/>
    </BrowserRouter>,
  document.getElementById('root')
);
