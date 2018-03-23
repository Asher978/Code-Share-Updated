import React, { Component } from 'react';
import io from 'socket.io-client';
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import Auth from './modules/Auth';

import Main from './NewComponents/Home/Main';
import Nav from './NewComponents/Nav';
import Profile from './NewComponents/Profile/Profile';
import CodeRoom from './NewComponents/CodeRoom/CodeRoom';

import './styles/App.css';
const socket = io('/');

class App extends Component {
  state = {
    auth: Auth.isUserAuthenticated(),
    user: null,
    currentPage: "home",
    form: "login",
    email: "",
    password: "",
    socket: null,
    room_name: "",
    coders: [],
  }
  
  
  componentDidMount () {
    const { auth } = this.state;
    if (auth) {
      this.getCurrentUser();
      socket.connect();
      socket.emit('connected');
      socket.on('users', users => {
        this.setState({ coders: Object.values(users) })
      })
    }
  }

  getCurrentUser = () => {
    const token = Auth.getToken();
    axios.get('/user/current_user', {
      headers: {
        'Authorization': `jwt ${Auth.getToken()}`,
      }
    }).then(res => {
      this.setState({ user: res.data})
    }).catch(err => console.log(err))
  }

  // user creates a new room and joins it 
  handleSubmitRoom = (e) => {
    e.preventDefault();
    const { room_name, user } = this.state;
    if(room_name, user) {
      socket.emit('add_room', room_name, user);
      socket.emit('connected');
      this.setState({ room_name: "" });
    }
  }

  // user joins an exisiting room
  handleJoinRoom = (room_name) => {
    const { user } = this.state;
   socket.emit('join_room', room_name, user) 
  }

  // user leaves a room
  handleLeaveRoom = (room_name) => {
    const { user } = this.state;
    socket.emit('user_left', {room_name, user});
  }

  // set state with desired for (login or register)
  handleSetForm = (form) => {
    this.setState({ form })
  };

  handleInputChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleRegister = (e) => {

  };

  handleLogin = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    axios.post('/user/login', { email, password })
      .then(res => {
        const { token, user } = res.data;
        if (token && user) {
          Auth.authenticateToken(token);
          socket.emit('user_joined', user)
          this.setState({
            auth: Auth.isUserAuthenticated(),
            user,
          })
        }
      }).catch(err => console.log(err));

      socket.on('users', users => {
        this.setState({ coders: Object.values(users) })
      })
  };

  handleLogOut = () => {
    axios.get('/user/logout')
      .then(res => {
        if (res.status === 200) {
          Auth.deauthenticateUser();
          this.setState({ auth: Auth.isUserAuthenticated() });
        }
      })
  };

  render () {
    const { auth, joinRoom, form, email, password, room_name, coders, user } = this.state;
    return (
      <div>
        <Nav auth={auth} setPage={this.setPage} handleLogOut={this.handleLogOut}/>
        <Router>
          <div>
            <Route exact path="/"
              render={ (props) =>
                !auth ?
                <Main 
                  auth={auth}
                  handleSetForm={this.handleSetForm}
                  form={form}
                  handleInputChange={this.handleInputChange}
                  handleLogin={this.handleLogin}
                  handleRegister={this.handleRegister}
                  email={email}
                  password={password}
                  {...props}
                /> : <Redirect to="/profile" /> }
            />

            <Route exact path="/profile"
              render={ (props) => auth ? <Profile 
                                      room_name={room_name}
                                      coders={coders}
                                      socket={socket}
                                      handleInputChange={this.handleInputChange}
                                      handleSubmitRoom={this.handleSubmitRoom}
                                      handleJoinRoom={this.handleJoinRoom}
                                      {...props}
                                    />
                                    :
                                    <Redirect to="/" /> }
            />

            <Route exact path="/coderoom"
              render={ (props) => auth ? <CodeRoom 
                                      socket={socket}
                                      user={user}
                                      handleLeaveRoom={this.handleLeaveRoom}
                                      {...props}
                                    /> : <Redirect to="/" /> }
            />

          </div>          
        </Router>
      </div>
    )
  }
}

export default App;