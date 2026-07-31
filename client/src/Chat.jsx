import React, { useContext } from 'react'
import './Chat.css'
import { MyContext } from './MyContext'
import ReactMarkdown from 'react-markdown';
import rehypehighlight from 'rehype-highlight'
import "highlight.js/styles/github.css"

function Chat() {
  const {newChat,chats}=useContext(MyContext)
  return (
    <>
      {newChat && <h1>Start a new chat!</h1>}
      
      <div className="chats">
        {
          chats?.map((chat,idx)=>(
            <div className={chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>
              {chat.role === "user"  ?
               <p className='userMessage'>{chat.content}</p>
               :<ReactMarkdown rehypePlugins={[rehypehighlight]}>{chat.content}</ReactMarkdown>
               }
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Chat
