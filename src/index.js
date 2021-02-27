import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { HashRouter, Route, Switch } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Headers from './Components/Headers';

ReactDOM.render(
    <React.StrictMode>
    <HashRouter  basename={process.env.PUBLIC_URL + "/"}>
      <Headers/>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/home" component={Home}/>
      </Switch>

    </HashRouter  >
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
