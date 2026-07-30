import './App.css'
import SideBar from './SideBar'
import ChatWindow from './ChatWindow'
import { MyContext } from './MyContext.jsx'

function App() {
  const providerValue={};
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
