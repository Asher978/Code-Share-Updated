import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const Home = () => {
  return (
    <div>
      <Jumbotron className="main">
        <div className="content">
          <h1 className="display-3">Hello, world!</h1>
          <p className="lead">Collaboration and coding has never been so easy!</p>
          <hr className="my-2" />
          <p>Our goal was to create an enviroment where coders can easily pair program and challenge themselves within a community.</p>
          <p className="lead">
          <Button color="primary" className="sign">Sign Up</Button>
          </p>
        </div>
      </Jumbotron>
    </div>
  );
}

export default Home;