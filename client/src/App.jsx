import './App.css'
import SideBar from './SideBar'
import ChatWindow from './ChatWindow'
import { MyContext } from './MyContext.jsx'
import { useState } from 'react'
import { v1 as uuidv1} from 'uuid'

function App() {
  const [prompt,setPrompt]=useState("");
  const[reply,setReply]=useState(null);
  const[currThreadID, setCurrThreadID]=useState(uuidv1());
  const[chats,setChats]=useState([]);//stores all the chats of current thread;
  const[newChat,setNewChat]=useState(true);
  const[allThreads,setAllThreads]=useState([]);//stores all the threads of the user
  const providerValue={
    prompt,setPrompt,reply,setReply,currThreadID, setCurrThreadID,chats,setChats,newChat,setNewChat,allThreads,setAllThreads
  };
  return (
    <div className='app'>
      <MyContext.Provider value={providerValue} >
      <SideBar></SideBar>
      <ChatWindow></ChatWindow>
      </MyContext.Provider>
    
    </div>
  )
}

export default App
