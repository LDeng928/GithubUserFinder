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


const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlerts] = useState(null);
  

  // Search github users
  const searchUsers = async (text) => {
    setLoading(true);

    // Put the state from Search.js as the url parameter
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    // Put the data from res into State. Then pass the state through props below. 
    // The response from the API
    setUsers(res.data.items);
    setLoading(false);
    
  }

  // Get a single Github user
  const getUser = async (username) => {
    setLoading(true);
    
    const res = await axios.get(`https://api.github.com/users/${username}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setUser(res.data);
    setLoading(false);    
  } 

  // Get User's repos
  const getUserRepos = async (username) => {
    setLoading(true);
    
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setRepos(res.data);  
    setLoading(false);
  }

  // Clear users from state
  const clearUsers = () => {
    setUsers([]);
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
    <Router>      
      <div className="App">
        <Navbar title="Github Finder" icon="fab fa-github"/>        
        <div className="container">
        <Alert alert={alert}/>
        <Switch>
          <Route exact path="/" render={props => (
            <Fragment>
              <Search searchUsers={ searchUsers } clearUsers={ clearUsers } showClear={ users.length > 0 ? true : false } setAlert={setAlert}/>
              <Users loading={loading} users={users}/>
            </Fragment>
          )}>              
          </Route>
          <Route path='/about' component={About}></Route>
          <Route exact path='/user/:login' render={props =>  (
            <User {...props} getUser={getUser} user={user} loading={loading} getUserRepos={getUserRepos} repos={repos}></User>
          )}></Route>
        </Switch>
        
        </div>        
      </div>
    </Router>
    )    
}

export default App;
