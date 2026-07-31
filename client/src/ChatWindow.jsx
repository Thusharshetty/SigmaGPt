import React, { useContext } from 'react'
import './ChatWindow.css'
import Chat from './Chat.jsx'
import { MyContext } from './MyContext.jsx'


function ChatWindow() {

  const { prompt, setPrompt, reply, setReply,currThreadID, setCurrThreadID } = useContext(MyContext);
 const getReply=async()=>{
  const options={
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      message:prompt,
      threadId:currThreadID
    })
  };

  try{
  const res=  await fetch("http://localhost:5000/api/chat",options);
  const rpy= await res.json()
  console.log(rpy);

  }catch(e){
    console.log(e)
  }
 }

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
          <input type="text" name="" id="" placeholder='Ask anything'
            value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
        </div>
        <p className="info">
          SigmaGpt can make mistakes. Check important info. See cookie preferences
        </p>
      </div>
    </div>
  )
}

export default ChatWindow
