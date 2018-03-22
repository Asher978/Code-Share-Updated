import React from 'react';

export default (props) => {
  const { auth, handleLogOut } = props;
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">

      { 
        auth &&
        <div className="container">
          <div className="navbar-header">
            <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <a href="#" className="navbar-brand">Code Share</a>
          </div>
          <div id="navbarCollapse" className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
              <li className="nav-item"><a className="dropdown-toggle" data-toggle="dropdown" href="#">
              <span className="glyphicon glyphicon-user nav-icons" aria-hidden="true"></span>Profile<b className="caret" /></a>
                <ul className="dropdown-menu">
                  <li><a href="#">My Profile</a></li>
                  <li><a onClick={handleLogOut}>Log Out<i className="fa fa-power-off padding-left-ten-px red-text" /></a></li>
                </ul>
              </li>
              <li className="nav-item"><a className="dropdown-toggle" data-toggle="dropdown" href="#">Coding Options<b className="caret" /></a>
                <ul className="dropdown-menu">
                  <li className="menu-item dropdown"><a href="#" className="dropdown-toggle" data-toggle="dropdown">Create a room</a>
                  </li>
                  <li className="menu-item dropdown"><a href="#" className="dropdown-toggle" data-toggle="dropdown">Join a room</a>
                  </li>
                </ul>
              </li>
              <li className="nav-item"><a className="nav-link" href="#">Login</a></li>
            </ul>
          </div>
        </div>
      }

      {
        !auth && 
        <div className="container">
          <div className="float-center">
            <a href="#" className="navbar-brand">Code Share</a>
          </div>
        </div>
      }

    </nav>
  )
}