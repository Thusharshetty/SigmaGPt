import React, { useEffect } from 'react'
import './SideBar.css';
import { MyContext } from './MyContext.jsx'
import { useContext } from 'react';
import { v1 as uuidv1} from 'uuid'

function SideBar() {
 const {allThreads,setAllThreads,currThreadID,setPrompt,setReply,setNewChat,setCurrThreadID,setChats}=useContext(MyContext);

 const getAllThreads=async()=>{
try{
  const response = await fetch("http://localhost:5000/api/threads");
  const res= await response.json();
  const filteredData=res.map(thread =>({threadId:thread.threadId ,title:thread.title}));
  console.log(filteredData);
  setAllThreads(filteredData);

}catch(e){
  console.log(e);
}
 }
 useEffect(()=>{
  getAllThreads();
 },[currThreadID]);

 const createNewChat=()=>{
  setNewChat(true);
  setPrompt("");
  setReply(null);
  setCurrThreadID(uuidv1());
  setChats([]);
 };
 const changeThread= async(newthreadId)=>{
  setCurrThreadID(newthreadId);
  try{
    const response =await fetch(`http://localhost:5000/api/thread/${newthreadId}`);
    const res=await response.json();
    console.log(res);
    setChats(res);
    setNewChat(false);
    setReply(null);
  }catch(e){
    console.log(e);
  }

 }
 const deleteThread=async(threadId)=>{
try{
const response=await fetch(`http://localhost:5000/api/thread/${threadId}`,{method:"DELETE"});
const res= await response.json();

//updated threads re-rendering;
setAllThreads(prevThreads=>prevThreads.filter(thread=>thread.threadId !== threadId));

if(threadId === currThreadID){
  createNewChat();
}

}catch(e){
  console.log(e);
}
 }

  return (
    <section className='sidebar'>
      <button onClick={createNewChat}>
        <img src="src/assets/blacklogo.png" alt="gpt-logo"  className='logo'/>
       <span> <i className="fa-solid fa-pen-to-square"></i></span>
      </button>
      <ul className='history'>
        {allThreads?.map((thread,idx) => 
          <li key={idx} onClick={()=>changeThread(thread.threadId)} className={thread.threadId === currThreadID ? "highlight" : ""}>
            {thread.title}
            <i className="fa-regular fa-trash-can"
            onClick={(e)=>{ 
              e.stopPropagation();
              deleteThread(thread.threadId);
            }}
            ></i>
            </li>
        )}
      </ul>

      <div className='sign'>
        <p>By Apna college &hearts;</p>
      </div>
    </section>
  )
}

export default SideBar
