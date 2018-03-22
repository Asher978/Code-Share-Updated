import React from 'react';
import Codemirror from '@skidding/react-codemirror';
import 'codemirror/lib/codemirror.css';  
import 'codemirror/theme/monokai.css';  
import 'codemirror/mode/javascript/javascript.js';

export default (props) => {
  const options = {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'monokai'
  };
  const { handleLeave, room_name } = props;
  return (
    <aside className="left-pan">
      <div className="code text-center">
        <h4 className="code-name">Room Name</h4>
        <Codemirror options={options} />
      </div>
      <div className="result alert alert-warning" role="alert">Results of your code execution will display here...</div>
      <button>Execute Code!</button>
      <button>Download Code!</button>
      <button className="exit-btn" onClick={() => handleLeave()}>Leave this room!</button>
    </aside>
  )
}