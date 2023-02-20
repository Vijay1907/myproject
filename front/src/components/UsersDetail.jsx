import React, { useState, useEffect } from 'react'
import './usersDetail.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UsersDetail(props) {
    const navigate = useNavigate();
    const [blankForm, setBlankForm] = useState({
        // address: "",
        // businessContact: "",
        // businessName: "",
        // city: "",
        // country: "",
        // password: "",
        // userContact: "",
        // userEmail: "",
        // userName: ""
    });


    const [editMode, setEditMode] = useState(true)
    const fetchData = async () => {
        let email = localStorage.getItem("email")
        let resp = await axios.get('http://localhost:3000/userdata', {
            params: {
                email: email
            }
        });
        setBlankForm(resp.data)
    }
    
    const handleChange = (e) => {
        const{name,value}= e.target
        setBlankForm({
            ...blankForm,
            [name] : value
        })

    // setBlankForm({...blankForm, [e.target.name]:e.target.value})
    }
    const handleLogout = (e) => {
         navigate("/login")
    }
    const focused=(e)=>{
        e.target.select();
    }
    const clcEdit = () => {
        setEditMode(false)
    }
    const clcCancel = () => {
        fetchData();
        setEditMode(true)
    }
    const clcSave = async () => {
        let res = await axios.put('http://localhost:3000/updateuser', blankForm);
        if(res.data){
            if(res.data.success){
                props.showAlert(res.data.message,"success")
            }else{
                props.showAlert(res.data.message,"danger")
            }
        }else{
            props.showAlert("some error occured","danger")
        } 
        setEditMode(true)
    }
    useEffect(() => {
        fetchData()
    }, [])


    return (
        <>
        <button onClick={handleLogout} style={{ width: "90px",position:"absolute", right: "0",marginRight: "52px"}}  className="btn btn-primary">Logout</button>
        <div style={{marginTop:"46px"}}>
            <h3 className='text-center mb-4'>User Details</h3>
            <div className='container'>
                <div className="row" style={{ justifyContent: "center", }}>
                    <div className="form-group col-md-6">
                        <label htmlFor="businessName">Business Name</label>
                        <input type="text" value={blankForm.businessName} onChange={handleChange} onFocus={focused} disabled={editMode} className="form-control" id="businessName" aria-describedby="emailHelp" name='businessName' style={{ width: "90%" }} />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="bussinessContact">Business Contact</label>
                        <input type="text" value={blankForm.businessContact} onChange={handleChange} onFocus={focused}  disabled={editMode} className="form-control" id="bussinessContact" aria-describedby="emailHelp" name='bussinessContact' style={{ width: "90%" }} />
                    </div>
                </div>

                <div className="row" style={{ justifyContent: "center", }}>
                    <div className="form-group col-md-6">
                        <label htmlFor="userName">User name</label>
                        <input type="text" value={blankForm.userName} onChange={handleChange}  onFocus={focused} disabled={editMode} className="form-control" id="userName" aria-describedby="emailHelp" name='userName' style={{ width: "90%" }} />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="password">Password</label>
                        <input type="text" value={blankForm.password} onChange={handleChange}  onFocus={focused} disabled={editMode} className="form-control" id="password" aria-describedby="emailHelp" name='password' style={{ width: "90%" }} />
                    </div>
                </div>

                <div className="row" style={{ justifyContent: "center", }}>
                    <div className="form-group col-md-6">
                        <label htmlFor="userContact">User Contact Number</label>
                        <input type="text" value={blankForm.userContact} onChange={handleChange} onFocus={focused}  disabled={editMode} className="form-control" id="userContact" aria-describedby="emailHelp" name='userContact' style={{ width: "90%" }} />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="userEmail">User Email</label>
                        <input type="email"value={blankForm.userEmail} onChange={handleChange}  onFocus={focused} disabled className="form-control" id="userEmail" aria-describedby="emailHelp" name='userEmail' style={{ width: "90%" }} />
                    </div>
                </div>

                <div className="row" style={{ justifyContent: "center", }}>
                    <div className="form-group col-md-6">
                        <label htmlFor="address">Address</label>
                        <input type="text" value={blankForm.address} onChange={handleChange} onFocus={focused}  disabled={editMode} className="form-control" id="address" aria-describedby="emailHelp" name='address' style={{ width: "90%" }} />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="country">Country</label>
                        <input type="text" value={blankForm.country} onChange={handleChange} onFocus={focused}  disabled={editMode} className="form-control" id="country" aria-describedby="emailHelp" name='country' style={{ width: "90%" }} />
                    </div>
                </div>


                <div className="row" >
                    <div className="form-group col-md-6" style={{marginBottom:"0"}}>
                        <label htmlFor="city">City</label>
                        <input type="text" value={blankForm.city} onChange={handleChange} onFocus={focused}  disabled={editMode} className="form-control" id="city" aria-describedby="emailHelp" name='city' style={{ width: "90%" }} />
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button type="button" onClick={clcEdit} style={{ width: "90px", marginRight: "13px" }} disabled={!editMode} className="btn btn-warning">Edit</button>
                    <button type="button" id="cancel" onClick={clcCancel} style={{ marginRight: "13px" }} disabled={editMode} className="btn btn-danger" >Cancel</button>
                    <button type="button" onClick={clcSave} style={{ marginRight: "13px" }} disabled={editMode} className="btn btn-success">Save Changes</button>
                </div>
            </div>
            </div>
        </>
    )
}

export default UsersDetail

