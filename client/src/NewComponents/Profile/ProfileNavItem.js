import React, { Component } from 'react';

export default class ProfileNavItem extends Component {
  
  renderData = (data) => {
    const { history } = this.props;
    return data.map((e, i) => {
      if (e.handleJoinRoom) { 
        let handle = (room_name) => {
          e.handleJoinRoom(room_name);
          history.push({
            pathname: "/coderoom",
            state: {
              room_name: room_name,
            }
          });
        } 
        return <li onClick={ () =>  handle(`${e.name}`) } key={i}><p>{e.name}</p></li>
      }
      return <li key={i}><p>{e.name}</p></li>
    })
  }


  render () {
    const { onSelectActive, id, title, icon, isActive, active, data } = this.props;
    return (
      <li
        className={isActive && active ? "has-submenu active" : "has-submenu"}
        onClick={() => onSelectActive(id)}
      >
        <a href="#"><i className={icon}></i> <span className="nav-label">{title}</span></a>
        <ul className="list-unstyled">
          
          { this.renderData(data) }
          
        </ul>
      </li>
    )
  }
}