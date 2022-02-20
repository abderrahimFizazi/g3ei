import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import {useNavigate } from "react-router";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useParams } from "react-router";
function EditModule() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [prof, setProf] = useState('')
    const [semestre, setSemestre] = useState('')
    const [error_list, setError_list] = useState([]) 
    const navigate = useNavigate()
    const [loading,setLoading] = useState(true)
    const {id} = useParams()
    useEffect(()=>{

        axios.get(`/api/edit_module/${id}`).then(res => {
            if(res.data.status === 200 ){
                setName(res.data.module.name)
                setDescription(res.data.module.description)
                setProf(res.data.module.prof)
                setSemestre(res.data.module.status)
            }
            else if( res.data.status === 422 ){
                swal("Error" , res.data.message , "error")
                navigate("/")
            }
            setLoading(false)
        })
    },[id])
    const SubmitModule = (e) => {
        e.preventDefault()
        const data = {
            name : name,
            prof : prof,
            description:description,
            semestre : semestre
        }
        axios.put(`/api/update_module/${id}`,data).then(res =>{
            if(res.data.status === 200){
                swal("Success",res.data.message,"success")
                navigate("/delegate")
            }
            else if(res.data.status === 400){
                setError_list(res.data.errors)
            }
        })    }

    return (
        <div className="container px-4">
            <h1 className="mt-4"> Edit Module</h1>
            <form onSubmit={SubmitModule}>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade card-body border show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="form-group mb-3">
                            <label>Name</label>
                            <input type="text" name="name" onChange={e => setName(e.target.value)} value={name} className="form-control" />
                            <span style={{ color: "red" }}>{error_list.name}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label>Semstre <span className="text-muted mx-2"> Svp rechoisissez le niveau!</span></label>
                            <select  className="form-control" onChange={e => setSemestre(e.target.value)} value={semestre}> 
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            </select >
                            <span style={{ color: "red" }}>{error_list.semestre}</span>

                        </div>
                        <div className="form-group mb-3">
                            <label>Prof  </label>
                            <input type="text" name="slug" onChange={e => setProf(e.target.value)} className="form-control" value={prof} />
                            <span style={{ color: "red" }}>{error_list.slug}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label>Description</label>
                            <textarea className="form-control" onChange={e => setDescription(e.target.value)} value={description} name="description"></textarea>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn  px-4 float-end" style={{"color" : "white" , "background" : "orange"}}>Submit</button>
            </form>
        </div>)
}

export default EditModule;
