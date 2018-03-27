import React from 'react';
import Message from './Message';
import Coder from './Coder';

export default (props) => {
  const { coders } = props;

  const renderCoders = () => {
    if(coders.length) {
      return coders.map((coder, i) => {
        return <Coder key={i} coder={coder} />
      })
    }
  }

  const codersLength = () => {
    return coders.length > 0 ? coders.length : '';
  }

  return (
    <aside className="right-panel">
      <div className="message text-center">
        <h4 className="message-name">Online Users { codersLength() }</h4>
      </div>
      <ul className="list-group">
         { renderCoders() }
      </ul>
      <ul className="list-group">
        <Message />
      </ul>
    </aside>
  )
}