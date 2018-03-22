import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Footer from './components/Footer';
import Events from './components/EventList';
import Challenges from './components/ChallengesList';
import CodeEditor from './components/CodeEditor';
import Login from './components/Login';
import Register from './components/Register';
import SingleChallenge from './components/SingleChallenge';
import MainNav from './components/MainNav';
import NotLoggedNav from './components/NotLoggedNav';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Auth from './modules/Auth';
import axios from 'axios';

class App extends Component {
  state = {
    auth: Auth.isUserAuthenticated(),
    user: null,
    username: '',
    currentPage: 'home',
  };

  componentDidMount() {
    console.log('CDM')
    if (this.state.auth) {
      const token = Auth.getToken();
      console.log("CDM Auth true", token)
      axios.get('/user/current_user', {
        headers: {
          'Authorization': `jwt ${Auth.getToken()}`,
        }
      })
      .then(res => {
        console.log('FROM CDM',res);
        this.setState({
          username: res.data.username
        })
      }).catch(err => console.log(err))
    }
  }


  setPage = (page) => {
    this.setState({
      currentPage: page,
    })
  }

  handleLoginSubmit = (e, username, password) => {
    e.preventDefault();
    axios.post('/user/login', {
      // username, 
      // password,
      "email": "testing123@test.com",
      "password": "testing",
    }).then(res => {
      const { user, token } = res.data;
      console.log("After Login User--->", user.username, token)
      if (token) {
        Auth.authenticateToken(token);
        this.setState({
          auth: Auth.isUserAuthenticated(),
          user,
          username: user.username,
          currentPage: 'home',
        });
      }
    }).catch(err => console.log(err));
  
  }

  handleRegisterSubmit = (e, username, password, email, firstname, lastname) => {
    e.preventDefault();
    axios.post('/user/register', {
      "email": "testing123@test.com",
      "password": "testing",
      "username": "Test Account",
      // firstname,
      // lastname,
    }).then(res => {
      const { newUser, token } = res.data;
      if (newUser && token) {
        Auth.authenticateToken(token);
        this.setState({
          auth: Auth.isUserAuthenticated(),
          user: newUser,
          currentPage: 'home',
        });
      }
    }).catch(err => console.log(err));
  }

  decideNav() {
     switch (this.state.auth) {
       case true: 
        return (
          <div>
            <MainNav setPage={this.setPage} username={this.state.username} />
          </div>
        )
       case false:
        return <NotLoggedNav setPage={this.setPage} />
       default:
        break; 
     }
   }

  decideAuth() {
    switch(this.state.currentPage) {
      case 'login':
      if(!this.state.auth) {
        return <Login handleLoginSubmit={this.handleLoginSubmit} />
      } 
      break;
      case 'register':
        if(!this.state.auth) {
          return <Register handleRegisterSubmit={this.handleRegisterSubmit} />        
      } 
      break;
      case 'logout':
        return (this.logOut());
      default:
        break;
    }
  }  

  logOut = () => {
    axios.get('/user/logout')
      .then(res => {
        Auth.deauthenticateUser();
        this.setState({
          auth: Auth.isUserAuthenticated(),
          currentPage: 'login',
        });
      }).catch(err => console.log(err));
  }
   
  render() {
    return (
      <Router >
      <div className="App">
        {this.decideNav()}
        <div className="main-components">
          {this.decideAuth()} 
          <Route exact path= "/" component={Home} />
          <Route exact path="/challenges" component={Challenges} />
          <Route exact path="/codeEditor" render={(props) => <CodeEditor user={this.state.user} {...props}/>} />         
          <Route exact path="/events" render={(match) => <Events id={this.state.user.id} match={match}/>} />
          <Route exact path="/challenges/:single" render={(props) => <SingleChallenge user={this.state.user.username} {...props}/>} />
        </div>  
      </div>
    </Router>
    );
  }
}

export default App;

