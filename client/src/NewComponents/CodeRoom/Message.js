import React from 'react';

export default (props) => {
  const { message } = props;
  return (
    <div>
      <li className="list-group-item">
        <span><strong>{message.username}: </strong><em>{message.message}</em></span>
      </li>
    </div>
  )
}