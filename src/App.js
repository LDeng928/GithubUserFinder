import './App.css';
import React from 'react';
import Navbar from './components/layout/Navbar';
import { Alert }  from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { About } from './components/pages/About';
import Home from './components/layout/Home';
import User from './components/users/User';
import { NotFound } from './components/pages/NotFound';


import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

const App = () => {   
  return (
    <GithubState>
    <AlertState>
        <Router>      
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github"/>        
        <div className="container">
        <Alert />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path='/about' component={About}></Route>
          <Route exact path='/user/:login' component={User}></Route>
          <Route component={NotFound}></Route>
        </Switch>
        
        </div>        
      </div>
    </Router>
    </AlertState>
    </GithubState>
  
    )    
}

export default App;
