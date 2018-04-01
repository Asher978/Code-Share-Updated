import React from 'react';
import Message from './Message';
import Coder from './Coder';

export default (props) => {
  const { coders, message, roomMessages, handleOnChangeMessage, handleSubmitMessage } = props;

  const renderCoders = () => {
    if(coders.length) {
      return coders.map((coder, i) => {
        return <Coder key={i} coder={coder} />
      })
    }
  }

  const renderMessages = () => {
    if(roomMessages.length) {
      return roomMessages.map((message, i) => {
        return <Message key={i} message={message} />
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
        { renderMessages () }
      </ul>

      <div className="message-input">
        <form className="form-inline" onSubmit={handleSubmitMessage}>
          <div className="form-group">
            <input
              type="text"
              className="form-control msg-input"
              placeholder="Type your message here..."
              value={message}
              onChange={handleOnChangeMessage}
            />
          </div>
          <button type="submit" className="msg-btn">Send</button>
        </form>
      </div>

    </aside>
  )
}