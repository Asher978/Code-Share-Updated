import React from 'react';

export default (props) => {
  const { email, password, username, handleInputChange, handleRegister } = props;
  return (
    <div className="row register-form">
      <div className="col-sm-4 col-sm-offset-1">
        <form role="form" className="r-form" onSubmit={handleRegister}>
          <div className="form-group">
            <input 
              type="text"
              name="username"
              placeholder="User Name..."
              className="r-form-first-name form-control"
              value={username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email..."
              className="r-form-last-name form-control"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password..."
              className="r-form-email form-control"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn">Sign me up!</button>
        </form>
      </div>
      <div className="col-sm-6 col-sm-offset-1 forms-right-icons">
        <div className="row">
          <div className="col-sm-2 icon"><i className="fa fa-pencil"></i></div>
            <div className="col-sm-10">
              <h3>Beautiful Forms</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et.</p>
            </div>
          </div>
        <div className="row">
          <div className="col-sm-2 icon"><i className="fa fa-commenting"></i></div>
            <div className="col-sm-10">
              <h3>Awesome Login</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et.</p>
            </div>
          </div>
        <div className="row">
          <div className="col-sm-2 icon"><i className="fa fa-magic"></i></div>
            <div className="col-sm-10">
              <h3>Great Registration</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et.</p>
            </div>
          </div>
        </div>
      </div>
  )
}