
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import UsersDetail from './components/UsersDetail';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alert from './components/Alert';
import {useState} from 'react'

function App() {
  const [visible,setVisible]=useState(false)
  const [message,setMessage]=useState("")
  const [color,setColor]=useState("")
  const showAlert=(message,color)=>{
      setVisible(true);
      setMessage(message)
      setColor(color)
      setTimeout(() => {
        setVisible(false);
      }, 1500);
  }
  const findLength=(obj)=>{
    let count=0;
     for(let keys in obj){
        if(obj[keys].length>0){
         count++;
        }
     }
     return count;
 }
  return (
    <>
    <Alert visible={visible} message={message} color={color}/>
     <BrowserRouter>
       <Routes>
         <Route exact path="/" element={<Signup showAlert={showAlert} findLength={findLength}/>}/>
           <Route exact path="/login" element={<Login showAlert={showAlert} findLength={findLength} />} />
           <Route exact path="/userDetail" element={<UsersDetail showAlert={showAlert} />} />
       </Routes>
     </BrowserRouter>
      </> 
       
  )
}

export default App;
