import React, { useContext, useEffect, useState } from 'react'
import './Chat.css'
import { MyContext } from './MyContext'
import ReactMarkdown from 'react-markdown';
import rehypehighlight from 'rehype-highlight'
import "highlight.js/styles/github-dark.css"

function Chat() {
  const {newChat,chats,reply}=useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);


  useEffect(()=>{
    if(reply === null){
      setLatestReply(null);
      return;
    }

    if(!chats?.length) return;
    const content =reply.split(" "); //this for word by word typing effect
    // const content =reply.split(""); //this for character by character typing effect
    let idx=0;
    const interval =setInterval(()=>{
      setLatestReply(content.slice(0,idx+1).join(" "))
      idx++;
      if( idx >= content.length){
        clearInterval(interval);
      }
    },40);
    return ()=>clearInterval(interval);
  },[chats,reply])
  return (
    <>
      {newChat && chats?.length ==0 && <h1>Start a new chat!</h1>}
      
      <div className="chats">
        <h1>{chats?.length > 0 ?chats[0]?.content :""}</h1>
        {
          chats?.slice(0,-1).map((chat,idx)=>(
            <div className={chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>
              {chat.role === "user"  ?
               <p className='userMessage'>{chat.content}</p>
               :<ReactMarkdown rehypePlugins={[rehypehighlight]}>{chat.content}</ReactMarkdown>
               }
            </div>
          ))
        }
        {
          chats?.length >0  && latestReply !== null &&
          <div className="gptDiv" key={"typing"}>
            <ReactMarkdown rehypePlugins={[rehypehighlight]}>{latestReply}</ReactMarkdown>
          </div>
        }
         {
          chats?.length >0  && latestReply === null &&
          <div className="gptDiv" key={"non-typing"}>
            <ReactMarkdown rehypePlugins={[rehypehighlight]}>{chats[chats.length - 1]?.content}</ReactMarkdown>
          </div>
        }
      </div>
    </>
  )
}

export default Chat
