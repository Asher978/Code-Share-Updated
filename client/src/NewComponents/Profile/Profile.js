import React, { Component } from 'react';
import pic from '../../images/profile.jpg';
import ProfileNavItem from './ProfileNavItem';

export default class Profile extends Component {
  state = {
    activeItem: null,
    active: false,
    rooms: [],
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
    const { handleSubmitRoom, history, room_name, user } = this.props;
    handleSubmitRoom(e);
    history.push({
      pathname: "/coderoom",
      state: {
        room_name: room_name,
      }
    })
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

  render () {
    const { handleInputChange, handleSubmitRoom, room_name } = this.props;
    return (
      <div>
        <aside className="left-panel">
          <div className="user text-center">
            <img className="img-circle" src={pic}/>
            <h4 className="user-name">Asher Shaheen</h4>
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
        </aside>
      </div>
    )
  }
}