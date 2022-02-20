import axios from "axios";
import React from "react";
import { useState } from "react";
import {useNavigate } from "react-router";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function AddCategory() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [slug, setSlug] = useState('')
    const [status, setStatus] = useState('')
    const [error_list, setError_list] = useState([]) 
    const navigate = useNavigate()
    const submitCategory = (e) => {
        e.preventDefault()
        status===true ? setStatus('1') : setStatus('0')
        const data = {
            name : name,
            slug : slug,
            description:description,
            status : status,
        }
        axios.post("/api/add_category",data).then(res =>{
            if(res.data.status === 200){
                swal("Success",res.data.message,"success")
                navigate("/admin/view_categories")
            }
            else if(res.data.status === 400){
                setError_list(res.data.errors)
            }
        })    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4"> Add Category</h1>
            <Link to="/admin/view_categories" className="btn  btn-small float-end" style={{"color" : "white" , "background" : "orange"}}>Back</Link>
            <form onSubmit={submitCategory}>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade card-body border show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="form-group mb-3">
                            <label>Name</label>
                            <input type="text" name="name" onChange={e => setName(e.target.value)} value={name} className="form-control" />
                            <span style={{ color: "red" }}>{error_list.name}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label>Slug</label>
                            <input type="text" name="slug" onChange={e => setSlug(e.target.value)} className="form-control" value={slug} />
                            <span style={{ color: "red" }}>{error_list.slug}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label>Description</label>
                            <textarea className="form-control" onChange={e => setDescription(e.target.value)} value={description} name="description"></textarea>
                        </div>
                        <div className="form-group mb-3">
                            <label>Status</label>
                            <input type="checkbox" name="status" onChange={e => setStatus(e.target.checked)} value={status} />   Status=1 Shown/Status=0 Hidden
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn  px-4 float-end" style={{"color" : "white" , "background" : "orange"}}>Submit</button>
            </form>
        </div>)
}

export default AddCategory;
