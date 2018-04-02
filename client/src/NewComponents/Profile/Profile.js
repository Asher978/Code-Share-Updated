import React, { Component } from 'react';
import pic from '../../images/profile.jpg';
import ProfileNavItem from './ProfileNavItem';
import axios from 'axios';
import User from '../../modules/User';
import Auth from '../../modules/Auth';

export default class Profile extends Component {
  state = {
    activeItem: null,
    active: false,
    rooms: [],
    file: null,
    items: [
      {
        id: 1,
        title: "online users",
        icon: "fa fa-users",
      },
      {
        id: 2,
        title: "current sessions",
        icon: "fa fa-desktop",
      },
      {
        id: 3,
        title: "my sessions",
        icon: "fa fa-code",
      }
    ]
  };
  

  componentDidMount() {
    const { socket } = this.props;
    const user = User.getUser();
    socket.emit('connected', user);
    socket.on('rooms', rooms => {
      this.setState({ rooms: Object.values(rooms) })
    })
  }

  onSelectActive = (itemId) => {
    const prevState = this.state.active;
    this.setState({ 
      activeItem: itemId,
      active: !prevState,
    })
  }

  handleSubmit = (e) => {
    const { handleSubmitRoom, history, room_name } = this.props;
    handleSubmitRoom(e);
    history.push({
      pathname: "/coderoom",
      state: {
        room_name: room_name
      }
    })
  };

  handleChangeFile = (e) => {
    this.setState({ file: e.target.files[0] });
  }

  handleUpload = async (e) => {
    e.preventDefault();
    const { file } = this.state;
    const { user } = this.props;
    const url = await axios.get('/upload/image', {
      headers: {
        'Authorization': `jwt ${Auth.getToken()}`,
      }
    });
    await axios.put(url.data.url, file, {
      headers: {
        'Content-Type': file.type
      }
    })

    await axios.put(`/user/${user._id}`, { imageUrl: url.data.key })
  }

  renderProfileNavItems = () => {
    const { items, activeItem, active, rooms } = this.state;
    const { coders, handleJoinRoom, history } = this.props;
    let data = null;
    return items.map(item => {
      switch (item.id) {
        case 1:
          data = coders.map(coder => {
            return { name: coder.email }
          });
          break;
        case 2:
          data = rooms.map(room => {
            return { name: room.roomName, handleJoinRoom }
          });
        default:
          break;
      }
      return <ProfileNavItem 
                {...item}
                key={item.id}
                activeItem={activeItem}
                isActive={item.id === activeItem}
                onSelectActive={this.onSelectActive}
                active={active}
                data={data}
                handleJoinRoom={handleJoinRoom}
                history={history}
              />
    })
  }

  renderUserInfo = () => {
    const user = User.getUser();
    if(user.userPic) {
      return (
        <div>
          <img className="img-circle" src={`https://s3.us-east-2.amazonaws.com/code-share-users-pics/${user.userPic}`} />
          <h4 className="user-name">{user.username}</h4>
        </div>
      )
    } else {
        <div>
          <img className="img-circle" src={pic} />
          <h4 className="user-name">{user.username}</h4>
        </div>
    }
  }

  render () {
    const { handleInputChange, handleSubmitRoom, room_name } = this.props;
    const { file } = this.state;
    return (
      <div>
        <aside className="left-panel">
          <div className="user text-center">
            { this.renderUserInfo() }
            <div className="dropdown user-login">
              <button className="btn btn-xs dropdown-toggle btn-rounded profile-btn" type="button" data-toggle="dropdown" aria-expanded="true">
                <i className="fa fa-circle status-icon available"></i> Available <i className="fa fa-angle-down"></i>
              </button>
              <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                <li role="presentation"><a role="menuitem" href="#"><i className="fa fa-circle status-icon signout"></i> Sign out</a></li>
              </ul>
            </div>

            <nav className="profile-navigation">
              <ul className="list-unstyled">

                { this.renderProfileNavItems() }

              </ul>
            </nav>
          </div>
        </aside>

        <aside className="right-pan">
          <div className="profile text-center">
            <h4 className="profile-name">Create a new Coding Session</h4>
          </div>
          <div className="col-sm-4 col-sm-offset-4">
            <form role="form" className="l-form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label className="sr-only" htmlFor="username">Email</label>
                <input 
                  type="text"
                  name="room_name"
                  placeholder="Enter your room name..."
                  className="l-form-username form-control" 
                  value={room_name}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn">Create and Join!</button>
            </form>
          </div>
          <div className="col-sm-4 col-sm-offset-4">
            <form onSubmit={this.handleUpload}>
              <input 
                type="file" accept="/image/*" onChange={this.handleChangeFile}
              />
              <button type="submit">Upload</button>
            </form>
          </div>
        </aside>
      </div>
    )
  }
}