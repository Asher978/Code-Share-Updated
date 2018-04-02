import React, { Component } from 'react';
import io from 'socket.io-client';
import User from '../../modules/User'

import Code from './Code';
import Chat from './Chat';


export default class CodeRoom extends Component {
  state = {
    coders: [],
    message: "",
    roomMessages: []
  }
  
  componentDidMount() {
    const { socket } = this.props;
    const { coders } = this.state;
    const { room_name } = this.props.location.state;
    if (!coders.length) {
      socket.emit('coders_list', room_name);
      socket.on("room_coders", coders => {
        this.setState({ coders })
      })

    }
    socket.on('messages', data => {
      this.setState({ roomMessages: [...data] })
    })
  };

  handleOnChangeMessage = (e) => {
    e.preventDefault();
    this.setState({ message: e.target.value })
  }

  handleLeave = () => {
    const { handleLeaveRoom, history } = this.props;
    const { room_name } = this.props.location.state;
    handleLeaveRoom(room_name);
    history.push({
      pathname: "/profile",
      state: {
        room_name: room_name,
      }
    })
  }

  handleSubmitMessage = (e) => {
    e.preventDefault();
    const { socket } = this.props;
    const user = User.getUser();
    const { message } = this.state;
    const { room_name } = this.props.location.state;    
    socket.emit('message_sent', {
      message,
      user,
      room_name
    })
    this.setState({ message: "" });
  }


  render () {
    const { coders, message, roomMessages } = this.state;
    const { room_name } = this.props.location.state;    
    return (
      <div>
        <div className="row">
          <Code handleLeave={this.handleLeave} room_name={room_name}/>

          <Chat
            coders={coders}
            message={message}
            roomMessages={roomMessages}
            handleOnChangeMessage={this.handleOnChangeMessage}
            handleSubmitMessage={this.handleSubmitMessage}
          />
        </div>
      </div>
      
    )
  }
}