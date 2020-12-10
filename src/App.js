import React from "react";

import './App.css';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import { AuthPage, RegisterPage, HomePage } from './pages/pages'

require("dotenv").config()

const App = () => {
  return (
    <div className="App">
        <Router>
            <Route path='/login' component={ AuthPage } />
            <Route path='/register' component={ RegisterPage } />
            <Route path='/home' component={ HomePage } />
            <Route exact path='/'><Redirect to='/home'>Home...</Redirect></Route>
        </Router>
    </div>
  );
}

export default App;
