import React, { Component } from 'react';
import {
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Input, 
  Button,
  Form, 
  FormGroup,
  Label,
} from 'reactstrap';

class EventAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      date: '',
      time: '',
      modal: false,
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

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div className="add">
        <Button className="add-event" color="danger" onClick={this.toggle}>Add Event</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add Event</ModalHeader>
          <Form onSubmit={(e) => this.props.handleEventSubmit(e, this.state.title, this.state.description, this.state.date, this.state.time)}>
            <ModalBody>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" id="title" name="title" placeholder="Event Title" value={this.state.title} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" name="description" id="description"  placeholder="Event Description" value={this.state.description} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="date">Date</Label>
                <Input type="date" name="date" id="date" value={this.state.date} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="time">Time</Label>
                <Input type="time" name="time" id="time" value={this.state.time} onChange={this.handleInputChange} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="danger">Create Event</Button>
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default EventAddForm;