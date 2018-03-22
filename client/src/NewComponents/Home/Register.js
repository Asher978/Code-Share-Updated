import React from 'react';

export default (props) => {
  console.log("reg Props", props)
  return (
    <div className="row register-form">
      <div className="col-sm-4 col-sm-offset-1">
        <form role="form" action="" method="post" className="r-form">
          <div className="form-group">
            <label className="sr-only" htmlFor="r-form-first-name">First name</label>
            <input type="text" name="r-form-first-name" placeholder="First name..." className="r-form-first-name form-control" id="r-form-first-name" />
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="r-form-last-name">Last name</label>
            <input type="text" name="r-form-last-name" placeholder="Last name..." className="r-form-last-name form-control" id="r-form-last-name" />
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="r-form-email">Email</label>
            <input type="text" name="r-form-email" placeholder="Email..." className="r-form-email form-control" id="r-form-email" />
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="r-form-about-yourself">About yourself</label>
            <textarea name="r-form-about-yourself" placeholder="About yourself..." className="r-form-about-yourself form-control" id="r-form-about-yourself"></textarea>
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