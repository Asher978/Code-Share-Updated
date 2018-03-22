import React from 'react';
import {
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

const Message = (props) => {
  return (
    <div className="message">
      <ListGroup>
        <ListGroupItem>
          <span>
            <strong>{props.user}: </strong>
            <em>{props.text}</em>
          </span>
        </ListGroupItem>
      </ListGroup>
    </div>
  )
}

export default Message;