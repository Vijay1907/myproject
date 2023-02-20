import React,{useState} from 'react'
import './signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signup(props){
    const navigate = useNavigate();
    const [blankForm, setBlankForm] = useState({
    });
    function ValidateEmail(input) {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return input.match(validRegex);
    }
    const postData = async () => {
        return await axios.post('http://localhost:3000/adduserdata', blankForm);    
    }
    const handleSignup=async (e)=>{
        e.preventDefault();
        if(ValidateEmail(blankForm.userEmail)){
            if(blankForm.password=== blankForm.confirmPassword){
                let resp= await postData();
                if(resp.data.success){
                   props.showAlert(resp.data.message,"success")
                   navigate('/login');
                }else{
                   props.showAlert(resp.data.message,"danger")
                }          
            }else{
            props.showAlert("password does not match","danger")
            } 
        }else{
            props.showAlert("enter a valid email","danger")
        }
    }
    const iconClicked=(e)=>{
        console.log("icon clicked")
        if(e.target.previousElementSibling.type=== "text"){
            e.target.previousElementSibling.type="password"
            e.target.className="fa fa-eye"
        } else{
            e.target.previousElementSibling.type="text";
            e.target.className="fa fa-eye-slash"
        }
    }

    const handleChange = (e) => {
        const{name,value}= e.target
        setBlankForm({
            ...blankForm,
            [name] : value
        })
    }
    


  return (
    <>
    <div className="outside-box mt-3">
    <div className="inside-box  ">
       <h3 className='text-center text-success mb-2'>Create a new account </h3>
            <form className='container'>
                <div className="row" style={{ justifyContent: "center", }}>
                    <div className="form-group col-md-4">
                        <label htmlFor="businessName">Business Name</label>
                        <input type="text" value={blankForm.businessName} onChange={handleChange} required className="form-control" id="businessName" aria-describedby="emailHelp" name='businessName' style={{ width: "90%" }} />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="businessContact">Business Contact</label>
                        <input type="text" value={blankForm.businessContact} onChange={handleChange} required className="form-control" id="businessContact" aria-describedby="emailHelp" name='businessContact' style={{ width: "90%" }} />
                    </div>
                </div>

                <div className="row" style={{ justifyContent: "center", }}>
                    <div className="form-group col-md-4">
                        <label htmlFor="userName">User name</label>
                        <input type="text" value={blankForm.userName} onChange={handleChange}  required className="form-control" id="userName" aria-describedby="emailHelp" name='userName' style={{ width: "90%" }} />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="userContact">User Contact Number</label>
                        <input type="text" value={blankForm.userContact} onChange={handleChange}  required className="form-control" id="userContact" aria-describedby="emailHelp" name='userContact' style={{ width: "90%" }} />
                    </div>
                </div>

                <div className="row" style={{ justifyContent: "center", }}>
                        <div className="form-group col-md-4">
                                <label htmlFor="password">Password</label>
                               
                                <input type="password" value={blankForm.password} onChange={handleChange}  required className="form-control" id="password" aria-describedby="emailHelp" name='password' style={{ width: "90%" }}/> {blankForm.password  &&
           <i id="confirm-password-icon" className="fa fa-eye" onClick={iconClicked} aria-hidden="true"></i> } 
                        </div>
                        <div className="form-group col-md-4">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                              
                                <input type="password" value={blankForm.confirmPassword} onChange={handleChange}  required className="form-control" id="confirmPassword" aria-describedby="emailHelp" name='confirmPassword' style={{ width: "90%" }} /> 
                                {blankForm.confirmPassword &&
           <i id="confirm-password-icon" className="fa fa-eye" onClick={iconClicked} aria-hidden="true"></i> } 
                        </div>
                </div>

                <div className="row" style={{ justifyContent: "center", }}>
                    <div className="form-group col-md-4">
                        <label htmlFor="address">Address</label>
                        <input type="text" value={blankForm.address} onChange={handleChange}  required className="form-control" id="address" aria-describedby="emailHelp" name='address' style={{ width: "90%" }} />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="userEmail">User Email</label>
                        <input type="email"value={blankForm.userEmail} onChange={handleChange}  required className="form-control" id="userEmail" aria-describedby="emailHelp" name='userEmail' style={{ width: "90%" }} />
                    </div>
                </div>


                <div className="row" style={{ justifyContent: "center", }}>
                    <div className="form-group col-md-4">
                        <label htmlFor="city">City</label>
                        <input type="text" value={blankForm.city} onChange={handleChange}  required className="form-control" id="city" aria-describedby="emailHelp" name='city' style={{ width: "90%" }} />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="country">Country</label>
                        <input type="text" value={blankForm.country} onChange={handleChange}  required className="form-control" id="country" aria-describedby="emailHelp" name='country' style={{ width: "90%" }} />
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button type="submit" onClick={handleSignup} disabled={props.findLength(blankForm) <10} style={{ width: "90px", marginRight: "13px" }}  className="btn btn-success">Signup</button>
                </div>
            </form>
    </div>
    </div>
    </>
  )
}

export default Signup