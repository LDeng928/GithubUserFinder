import './App.css';
import React, { useState, Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import {Alert}  from './components/layout/Alert';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { About } from './components/pages/About';
import User from './components/users/User';

import GithubState from './context/github/GithubState';


const App = () => {  
 
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlerts] = useState(null);
  
 
 
 

  // Get User's repos
  const getUserRepos = async (username) => {
    setLoading(true);
    
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setRepos(res.data);  
    setLoading(false);
  }



  // SetAlert method
  const setAlert = (message, type) => {
    setAlerts({ message, type});
    

    // Make the alert message disappear in 5 seconds
    setTimeout(() => setAlert(null), 5000);
  }

  // Load original users data when the page loads
  // async componentDidMount() {    
  //   this.setState({loading: true});

  //   // You need to mount the API call here. Use axios     
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   // Put the data from res into State. Then pass the state through props below. 
  //   this.setState({ users: res.data, loading: false });
  // }



  return (
    <GithubState>
        <Router>      
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github"/>        
        <div className="container">
        <Alert alert={alert}/>
        <Switch>
          <Route exact path="/" render={props => (
            <Fragment>
              <Search setAlert={setAlert}/>
              <Users />
            </Fragment>
          )}>              
          </Route>
          <Route path='/about' component={About}></Route>
          <Route exact path='/user/:login' render={props =>  (
            <User {...props}  getUserRepos={getUserRepos} repos={repos}></User>
          )}></Route>
        </Switch>
        
        </div>        
      </div>
    </Router>
    </GithubState>
  
    )    
}

export default App;
