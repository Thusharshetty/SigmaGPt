import React, { useContext, useState ,useEffect} from 'react'
import './ChatWindow.css'
import Chat from './Chat.jsx'
import { MyContext } from './MyContext.jsx'
import {ScaleLoader} from 'react-spinners'


function ChatWindow() {

  const { prompt, setPrompt, reply, setReply,currThreadID, setCurrThreadID,chats,setChats } = useContext(MyContext);
  const [loading , setLoading]= useState(false);
 const getReply=async()=>{
  setLoading(true);
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
  const response=  await fetch("http://localhost:5000/api/chat",options);
  const res= await response.json();
  setReply(res.reply);

  }catch(e){
    console.log(e)
  }
  setLoading(false);
 }


useEffect(()=>{
  if(prompt && reply){
    setChats(prevchats=>(
      [...prevchats , {
        role:"user",
        content:prompt
      },{
        role:"assistant",
        content:reply
      }]
    ))
  }
  setPrompt("")
},[reply])

  return (
    <div className='chatwindow'>
      <div className='navbar'>
        <span>SigmaGpt <i className="fa-solid fa-chevron-down"></i></span>
        <div className="userIcondiv">
          <span className='userIcon'><i className="fa-solid fa-user"></i></span>
        </div>
      </div>
      <Chat></Chat>
      <ScaleLoader color='#fff' loading={loading}>
      </ScaleLoader>
      <div className="chatInput">
        <div className="inputBox">
          <input type="text" name="" id="" placeholder='Ask anything'
            value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e)=>e.key ==='Enter' ? getReply(): ""}/>
          <div id="submit" onClick={getReply} ><i className="fa-solid fa-paper-plane"></i></div>
        </div>
        <p className="info">
          SigmaGpt can make mistakes. Check important info. See cookie preferences
        </p>
      </div>
    </div>
  )
}

export default ChatWindow
