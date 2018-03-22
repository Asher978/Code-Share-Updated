import React from 'react';

export default (props) => {
  const { email, password, handleInputChange, handleLogin } = props;
  return (
    <div className="row login-form">
      <div className="col-sm-4 col-sm-offset-1">
        <form role="form" onSubmit={handleLogin} className="l-form">
          <div className="form-group">
            <label className="sr-only" htmlFor="username">Email</label>
            <input 
              type="email"
              name="email"
              placeholder="Email..."
              className="l-form-username form-control" 
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password..."
              className="l-form-password form-control"
              id="l-form-password"
              onChange={handleInputChange}
              value={password}
            />
          </div>
          <button type="submit" className="btn">Sign in!</button>
        </form>
        <div className="social-login">
          <p>Or login with:</p>
            <div className="social-login-buttons">
              <a className="btn btn-link-1" href="#"><i className="fa fa-facebook"></i></a>
              <a className="btn btn-link-1" href="#"><i className="fa fa-twitter"></i></a>
              <a className="btn btn-link-1" href="#"><i className="fa fa-google-plus"></i></a>
            </div>
          </div>
        </div>
      <div className="col-sm-6 col-sm-offset-1 forms-right-icons">
        <div className="row">
          <div className="col-sm-2 icon"><i className="fa fa-user"></i></div>
            <div className="col-sm-10">
              <h3>New Features</h3>
              <p>Ability to create your own coding sessions, have you friends join your sessions. Save you work from the session on your local machine...</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2 icon"><i className="fa fa-eye"></i></div>
              <div className="col-sm-10">
                <h3>Easy To Use</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et.</p>
              </div>
            </div>
          <div className="row">
            <div className="col-sm-2 icon"><i className="fa fa-twitter"></i></div>
              <div className="col-sm-10">
                <h3>Social Integrated</h3>
                <p>Login with your social media accounts: Google  |  FaceBook</p>
              </div>
            </div>
          </div>
        </div>
  )
}