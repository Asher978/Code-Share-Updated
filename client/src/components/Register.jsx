import React, {Component} from 'react';
import { 
  Col, 
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
  FormText 
} from 'reactstrap';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      email: '',
      firstname: '',
      lastname: '',
      currentPage: 'register',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="bg-container">
        <Form onSubmit={(e) => this.props.handleRegisterSubmit(e, this.state.username, this.state.password, this.state.email, this.state.firstname, this.state.lastname)}>
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
          <Label for="userEmail">Email</Label>
          <Input 
            type="email" 
            name="email" 
            id="userEmail" 
            value={this.state.email} 
            placeholder="Enter An Email Address" 
            onChange={this.handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input 
            type="text" 
            name="firstname" 
            id="firstName" 
            value={this.state.firstname} 
            placeholder="Enter First Name" 
            onChange={this.handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input 
            type="text" 
            name="lastname" 
            id="lastName" 
            value={this.state.lastname} 
            placeholder="Enter Last Name" 
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

export default Register;