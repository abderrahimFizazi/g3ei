import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import {useNavigate, useParams } from "react-router";
import swal from "sweetalert";
const Edit_category = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [slug, setSlug] = useState('')
    const [status, setStatus] = useState(false)
    const [error_list, setError_list] = useState([]) 
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const {id} = useParams()
    useEffect(()=>{

        axios.get(`/api/edit_category/${id}`).then(res => {
            if(res.data.status === 200 ){
                setName(res.data.category.name)
                setDescription(res.data.category.description)
                setSlug(res.data.category.slug)
               setStatus(res.data.category.status)
            }
            else if( res.data.status === 422 ){
                swal("Error" , res.data.message , "error")
                navigate("/admin/view_categories")
            }
            setLoading(false)
        })
    },[id])
if(loading){
    return(
        <h3>Loading category...</h3>
    )
}
const edit_category = (e) => {
    e.preventDefault()
    const data = {
        name : name,
        slug : slug,
        description:description,
        status : status,
    }
    axios.put(`/api/update_category/${id}`, data).then(res => {
        if(res.data.status === 200 ){
            swal("Success",res.data.message,"success")
            navigate("/admin/view_categories")
        }
        else if(res.data.status === 400){
            setError_list(res.data.errors)
        }
    })
}

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4"> Edit category</h1>
            <form onSubmit={edit_category}>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade card-body border show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="form-group mb-3">
                    <label>Slug</label>
                    <input type="text" name="slug" onChange={e => setSlug(e.target.value) } className="form-control" value={slug}/>
                    <span style={{color: "red"}}>{error_list.slug}</span>
                    </div>
                    <div className="form-group mb-3">
                    <label>Name</label>
                    <input type="text" name="name"onChange={e => setName(e.target.value)}  value={name} className="form-control"/>
                    <span style={{color: "red"}}>{error_list.name}</span>
                    </div>
                    <div className="form-group mb-3">
                    <label>Description</label>
                    <textarea className="form-control" onChange={e => setDescription(e.target.value)} value={description} name="description"></textarea>
                    </div>
                    <div className="form-group mb-3">
                    <label>Status</label>
                    <input type="checkbox" name="status" onChange={e => setStatus(e.target.checked)}   defaultChecked={status}/>   Status=1 Shown/Status=0 Hidden
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary px-4 float-end">Edit</button>
            </form>
        </div>
    )
}
export default Edit_category