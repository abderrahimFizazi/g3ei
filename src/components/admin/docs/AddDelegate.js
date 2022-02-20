import axios from "axios";
import React from "react";
import { useState } from "react";
import {useNavigate } from "react-router";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function AddDelegate() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error_list, setError_list] = useState([]) 
    const navigate = useNavigate()
    const submitCategory = (e) => {
        e.preventDefault()
        const data = {
            name : name,
            email : email,
            password:password,
        }
        axios.post("/api/add_user",data).then(res =>{
            if(res.data.status === 200){
                swal("Success",res.data.message,"success")
                navigate("/admin/view_delegates")
            }
            else if(res.data.status === 400){
                setError_list(res.data.errors)
            }
        })    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4"> Regester new delegate</h1>
            <Link to="/admin/view_delegates" className="btn  btn-small float-end" style={{"color" : "white" , "background" : "orange"}}>Back</Link>
            <form onSubmit={submitCategory}>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade card-body border show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="form-group mb-3">
                            <label>Name</label>
                            <input type="text" name="name" onChange={e => setName(e.target.value)} value={name} className="form-control" />
                            <span style={{ color: "red" }}>{error_list.name}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label>email</label>
                            <input type="text" name="slug" onChange={e => setEmail(e.target.value)} className="form-control" value={email} />
                            <span style={{ color: "red" }}>{error_list.email}</span>
                            </div>
                        <div className="form-group mb-3">
                            <label>Password</label>
                            <input type="password" className="form-control" name="status" onChange={e => setPassword(e.target.value)} value={password} /> 
                            <span style={{ color: "red" }}>{error_list.password}</span>

                        </div>
                    </div>
                </div>
                <button type="submit" className="btn  px-4 float-end" style={{"color" : "white" , "background" : "orange"}}>Submit</button>
            </form>
        </div>)
}

export default AddDelegate;
