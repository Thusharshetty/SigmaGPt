import React from 'react'
import './ChatWindow.css'
import Chat from './Chat.jsx'


function ChatWindow() {
  return (
    <div className='chatwindow'>
      <div className='navbar'>
        <span>SigmaGpt <i className="fa-solid fa-chevron-down"></i></span>
        <div className="userIcondiv">
          <span className='userIcon'><i className="fa-solid fa-user"></i></span>
        </div>
      </div>
      <Chat></Chat>
      <div className="chatInput">
        <div className="inputBox">
          <input type="text" name="" id="" placeholder='Ask anything'/>
          <div id="submit"><i className="fa-solid fa-paper-plane"></i></div>
        </div>
        <p className="info">
          SigmaGpt can make mistakes. Check important info. See cookie preferences
        </p>
      </div>
    </div>
  )
}

export default ChatWindow
