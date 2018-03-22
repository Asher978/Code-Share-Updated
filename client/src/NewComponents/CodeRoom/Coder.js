import React from 'react';

export default props => {
  const { coder } = props;
  return <li className="coders-list list-group-item-text">{coder.email}</li>
}