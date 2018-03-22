import React, { Component } from 'react';
import challenge from '../challenge/challenge';
import { Link } from 'react-router-dom';
import { 
  ListGroup, 
  ListGroupItem, 
  ListGroupItemHeading, 
  ListGroupItemText 
} from 'reactstrap';

class Challenges extends Component {
  render () {
    return (
      <div className="bg-challenges">
        <h4>Challenges</h4>
        <ListGroup>
        {challenge.map(c => {
          return (
            <ListGroupItem key={c.id}>
              <ListGroupItemHeading className="challenge-header"><Link to={`/challenges/${c.id}`}><p>Challenge # {c.id}</p></Link></ListGroupItemHeading>
              <ListGroupItemText>{c.chall}</ListGroupItemText>
            </ListGroupItem>
            )
          })}
        </ListGroup>
      </div>
    )
  }
}

export default Challenges;