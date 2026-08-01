import React, { useEffect } from 'react'
import './SideBar.css';
import { MyContext } from './MyContext.jsx'
import { useContext } from 'react';

function SideBar() {
 const {allThreads,setAllThreads,currThreadID}=useContext(MyContext);

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
 },[currThreadID])

  return (
    <section className='sidebar'>
      <button>
        <img src="src/assets/blacklogo.png" alt="gpt-logo"  className='logo'/>
       <span> <i className="fa-solid fa-pen-to-square"></i></span>
      </button>
      <ul className='history'>
        {allThreads?.map((thread,idx) => 
          <li key={idx}>{thread.title}</li>
        )}
      </ul>

      <div className='sign'>
        <p>By Apna college &hearts;</p>
      </div>
    </section>
  )
}

export default SideBar
