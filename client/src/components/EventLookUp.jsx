import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    InputGroup,
    Input,
    InputGroupButton,
} from 'reactstrap';


class EventLookUp extends Component {
    constructor() {
        super();
        this.state = {
            ZIP: '',
        }
    }

    handleEventLookUpChange = (e) => {
        const name = e.target.name;
        const value = e.target.value
        this.setState({
            [name]: value,
        })
    }
    
    render () {
        return (
            <div className="event-lookup">
                <Form onSubmit={(e) => this.props.handleEventLookUp(e, this.state.ZIP)}>
                  <FormGroup>
                    <InputGroup>
                        <Input type="text" maxLength='5' name="ZIP" placeholder="Search Zip Code" value={this.state.ZIP} onChange={this.handleEventLookUpChange} />
                        <InputGroupButton color="primary">Find Events</InputGroupButton>
                    </InputGroup>
                  </FormGroup>
                </Form>
            </div>
        )
    }
}

export default EventLookUp;