import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login(props) {

    const navigate= useNavigate();
    const [credentials,setCredentials]= useState({})

    const handleChange=(e)=>{
       setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    const handleLogin=async(e)=>{
        e.preventDefault();
        let res= await axios.post("http://localhost:3000/credentials",credentials);
        if(res.data){
            if(res.data.success){
                localStorage.setItem("email", credentials.userEmail);
                props.showAlert(res.data.message,"success")
               navigate("/userDetail")
            }else{
                props.showAlert(res.data.message,"danger")
            }
        }else{
            props.showAlert("some error occured","danger")
        } 
    } 
    
    return (
        <>
        <div className='outside-box'>
    <div className='container' style={{display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center",background:"#d3d3d3",width:"45%",padding:"20px 0px"}}>
        <h2 className='text-center my-2'>Login </h2>
         <form style={{width:"50%"}} >
         <div className="form-group" >
            <label htmlFor="userEmail">User Email</label>
            <input type="text" value={credentials.userEmail} onChange={handleChange} required className="form-control" id="userEmail" aria-describedby="emailHelp" name='userEmail'/>
        </div>
         <div className="form-group ">
            <label htmlFor="password">Password</label>
            <input type="password" value={credentials.password} onChange={handleChange} required className="form-control" id="password" aria-describedby="emailHelp" name='password' />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
                    <button type="submit" disabled={props.findLength(credentials)<2} onClick={handleLogin} style={{ width: "100%"}}  className="btn btn-primary my-2">Login</button>
                </div>
         </form>
         </div>
 </div>
 </>
  )
}

export default Login