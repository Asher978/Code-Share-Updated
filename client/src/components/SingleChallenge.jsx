import React, { Component } from 'react';
import Codemirror from '@skidding/react-codemirror';
import { 
  Container, 
  Row, 
  Col,
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Input, 
  InputGroup,
  InputGroupButton,
} from 'reactstrap';
import Chat from './Chat';
import 'codemirror/lib/codemirror.css';  
import 'codemirror/theme/monokai.css';  
import 'codemirror/mode/javascript/javascript.js';
import io from 'socket.io-client';
import axios from 'axios';
import fileSaver from 'file-saver';
import challenge from '../challenge/challenge';
import { Alert } from 'reactstrap';

const socket = io.connect();
class SingleChallenge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      codeResult: 'Result will be displayed here',
      text: '',
      messages: [],
      users: [],
      fileName: '',
      test: `${challenge[`${this.props.match.params.single}`-1].test}`,
      alert: 'warning',
      modal: false,
    }
  }

  componentWillMount() {
    this.props.user ? 
      socket.emit('user join', this.props.user) : 
    console.log('Null user');
  }

  componentDidMount() {
    socket.on('user join', this.handleUsers);
    socket.on('message', this.handleRecievedMessage);
    socket.on('code', this.handleCodeFromSockets);
    socket.on('checked', this.codeResultCheck);
  //   socket.on('leave', this.handleLeaveUser);
  }

  handleUsers = (users) => {
    this.setState({users: users}); 
  }

  handleCodeFromSockets = (code) => {
    this.setState({code: code});
  }

  codeResultCheck = (result) => {
    this.setState({codeResult: result});
  }

  handleUpdateCodeState = (text) => {
    socket.emit('coding', text);
    this.setState({code: text});
  }

  handleRecievedMessage = (message) => {
    let messages = this.state.messages;
    messages.push(message);
    this.setState({messages: messages});
  }

  handleMessageSubmit = (message) => {
    socket.emit('send message', message);
  }

  // evaluating the code from the editor and setting state of the result
  handleExecuteCode = (code, test) => {
    if(code + test) {
      axios.post('/code', {
        code: code + test,
      }).then(res => {
        let obj = res.data.data;
        console.log('frontend received--->', obj)
        if (obj.__flags) {
          this.setState({ codeResult: 'Nice Work! Test Passed!', alert: 'success' })
        } else {
          this.setState({ codeResult: 'Error: ' + res.data.data, 'alert': 'danger' })
        }
        socket.emit('test check', this.state.codeResult);
      }).catch(err => console.log(err));
    }    
  }

  // handle for saving the user code
  handleSaveCode = (code, filename) => {
    console.log(code, filename);
    let blob = new Blob([code], {type: 'text/javascript'});
    fileSaver.saveAs(blob, filename+'.js');
  }
  
  // handle for the change on filename input
  handleSaveCodeChange = (e) => {
    this.setState({ fileName: e.target.value })
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const options = {
      lineNumbers: true,
      mode: 'javascript',
      theme: 'monokai'
    }

    return (
      <div>
        <Container>
          <Row>
            <Col md="10">
              <div className="main-challenge">
              <h1>Challenge</h1>
              <p>{challenge[`${this.props.match.params.single}`-1].chall}</p>
  
              <Codemirror
                value={this.state.code}
                onChange={this.handleUpdateCodeState}
                options={options}
              />

              <Alert color={this.state.alert}>
                <strong>{this.state.codeResult}</strong>
              </Alert>

              <InputGroup className="test">
                <InputGroupButton className="cta-buttons" color="success" onClick={this.toggle}>Download Code</InputGroupButton>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                  <ModalHeader toggle={this.toggle}>Save Code Locally</ModalHeader>
                  <ModalBody>
                    <p>You can even save your files offline to use in any code editor! <br />
                      Isn't that sweet!</p>
                    <Input 
                      placeholder="Enter file name" 
                      value={this.state.fileName} 
                      onChange={this.handleSaveCodeChange}
                      />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" onClick={() => this.handleSaveCode(this.state.code, this.state.fileName)}>Download</Button>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
                </Modal>
                <InputGroupButton className="cta-buttons" color="primary" onClick={() => this.handleExecuteCode(this.state.code, this.state.test)}>Execute Code</InputGroupButton>
              </InputGroup>

              </div>
            </Col>

            <Col md="2">
              <Chat 
                handleMessageSubmit={this.handleMessageSubmit} 
                value={this.state.message} 
                handleChange={this.handleUpdateMessageState}
                messages={this.state.messages}
                users={this.state.users}
                user={this.props.user}
                online={this.state.users.length}
              />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default SingleChallenge;