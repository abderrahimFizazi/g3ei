import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function AddDoc() {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [file, setFile] = useState([])
    const [error_list, setError_list] = useState([])
    const navigate = useNavigate()
    const handlFile = (e) => {
        setFile({ file : e.target.files[0] })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("module_id", id)
        data.append("name", name)
        data.append("type", type)
        data.append("file", file.file)
        axios.post(`/api/add_doc/${id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success")
                navigate("/delegate/view_docs/"+id)
            }
            else if (res.data.status === 400) {
                setError_list(res.data.errors)
            }
        })
    }

    return (
        <div className="container px-4">
            <h1 className="mt-4"> Add Document</h1>
            <form onSubmit={handleSubmit} enctype="multipart/form-data">
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade card-body border show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input type="text" name="name" onChange={e => setName(e.target.value)} value={name} className="form-control" />
                        </div>
                        <div className="form-group mb-3">
                            <label>Type</label>
                            <select className="form-control" onChange={e => setType(e.target.value)} value={type} >
                            <option value="" disabled selected>Select your option</option>
                                <option>cours</option>
                                <option>td</option>
                                <option>tp</option>
                                <option>projet</option>
                                <option>autre</option>
                            </select >
                            <span style={{ color: "red" }}>{error_list.type}</span>                      
                        </div>
                        <div className="form-group mb-3">
                            <label>File</label>
                        <input type="file" onChange={handlFile} className="form-control my-2" />
                        <span style={{ color: "red" }}>{error_list.file}</span>                      

                        </div>
                    </div>
                </div>
                <button type="submit" className="btn  px-4 float-end" style={{ "color": "white", "background": "orange" }}>Submit</button>
            </form>
        </div>)
}

export default AddDoc;
