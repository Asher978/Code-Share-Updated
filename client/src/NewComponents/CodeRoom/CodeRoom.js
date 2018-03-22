import React, { Component } from 'react';
import io from 'socket.io-client';

import Code from './Code';
import Chat from './Chat';


export default class CodeRoom extends Component {
  state = {
    coders: [],
  }

  handleLeave = () => {
    const { handleLeaveRoom, history } = this.props;
    const { room_name } = this.props.location.state;
    console.log("from handle leave room", room_name)
    handleLeaveRoom(room_name);
    history.push({
      pathname: "/profile",
      state: {
        room_name: room_name,
      }
    })
  }


  componentDidMount() {
    const { socket } = this.props;
    const { coders } = this.state;
    const { room_name } = this.props.location.state;
    if (!coders.length) {
      socket.emit('coders_list', room_name);
      console.log("NO CODERS")
      socket.on("room_coders", coders => {
        console.log('Rooms coders', coders)
        this.setState({ coders })
      })
    }
  };

  

  render () {
    const { coders } = this.state;
    const { room_name } = this.props.location.state;    
    return (
      <div>
        <div className="row">
          <Code handleLeave={this.handleLeave} room_name={room_name}/>

          <Chat coders={coders} />
        </div>
      </div>
      
    )
  }
}