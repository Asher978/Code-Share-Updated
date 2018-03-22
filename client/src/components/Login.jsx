import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { 
  Col, 
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  FormText 
} from 'reactstrap';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
     e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
      <div className="bg-container">
        <Form onSubmit= {(e) => this.props.handleLoginSubmit(e, this.state.username, this.state.password)}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input 
              type="text" 
              name="username" 
              id="username" 
              value={this.state.username} 
              placeholder="Enter Username" 
              onChange={this.handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="userPassword">Password</Label>
            <Input 
              type="password" 
              name="password" 
              id="userPassword" 
              value={this.state.password} 
              placeholder="Enter Password" 
              onChange={this.handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Button color="success">Submit</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default Login;