import React, { useContext } from 'react'
import './Chat.css'
import { MyContext } from './MyContext'

function Chat() {
  const {newChat,chats}=useContext(MyContext)
  return (
    <>
      {newChat && <h1>Start a new chat!</h1>}
      <div className="chats">
        <div className="userDiv">
          <p className="userMessage">user Chat</p>
        </div>
        <div className="gptDiv">
          <p className="gptMessage">Gpt Chat</p>
        </div>
      </div>
    </>
  )
}

export default Chat
