import React, { Component } from 'react';
import Message from './Message';
import { 
  Button, 
  Form, 
  FormGroup, 
  Input,
  ListGroup,
  ListGroupItem,
  InputGroup,
  InputGroupButton, 
} from 'reactstrap';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const message = {
      user: this.props.user,
      text: this.state.text,
    }
    this.props.handleMessageSubmit(message);
    console.log(message);
    this.setState({text: ''});
  }

  handleTextChange = (e) => {
    this.setState({text: e.target.value});
  }

  render() {
    console.log('CHAT PROPS', this.props)
    return (
      <div className="chat">
        <ListGroup className="online">
          <ListGroupItem color="success">Online Users ({this.props.online})</ListGroupItem>
        </ListGroup>
        <div className="users">
          <ListGroup>
            {this.props.users.map((user, i) => {
              return <ListGroupItem key={i}>{user}</ListGroupItem>
            })}   
          </ListGroup>
        </div>
        <div className="messages">
          {this.props.messages.map((message, i) => {
            return ( 
              <Message 
                key={i}
                user={message.user}
                text={message.text} 
              />
            )
          })}
        </div>
        <Form onSubmit={(e) => this.handleFormSubmit(e)} inline>
          <FormGroup>
            <InputGroup>
              <Input type="text" className="textbox" value={this.state.text} onChange={this.handleTextChange} placeholder="Type Message Here" />
              <InputGroupButton><Button color="primary">Send</Button></InputGroupButton>
            </InputGroup>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default Chat;