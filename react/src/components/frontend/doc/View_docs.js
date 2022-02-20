import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import * as Ai from "react-icons/ai"
import { useNavigate, useParams } from 'react-router'
import moment from 'moment'
const ViewCategories = () => {
    const [docs, setDocs] = useState([])
    const [loading, setLoading] = useState(true)
    const [Module, setModule] = useState([])
    const { id } = useParams()
    var cours = ""
    var tds = ''
    var tps = ''
    var projets = ''
    var autres = ''
    useEffect(() =>
        axios.get(`/api/get_module_docs/${id}`).then(res => {
            if (res.data.status === 200) {
                setDocs(res.data.message)
                if (res.data.module) {
                    setModule(res.data.module)
                }
                
            }
            setLoading(false)
        })
        , [])
    if (loading) {
        return <h4>Loading Docs List...</h4>
    }
    else {
        cours = docs.map(item => {
            if (item.type === 'cours') {
                return (
                    <tr key={item.id} className=" text-center">
                        <td>   <span style={{ "textDecoration": "none", "color": "black" }}> {item.name}</span></td>
                        <td><a target="_blank" href={`http://localhost:8000/${item.file}`} >{item.file}</a></td>
                        <td>{moment(item.created_at).format("dddd Do YYYY, h:mm:ss a")}</td>
                        <td>  <Link to={'#'} onClick={e => deleteDoc(e, item.id)} style={{ "textDecoration": "none", "color": "red" }}><Ai.AiFillDelete style={{ fill: "red" }} size={25} /></Link></td>
                    </tr>
                )
            }
        })
        tds = docs.map(item => {
            if (item.type === 'td') {
                return (
                    <tr key={item.id} className=" text-center">
                        <td>   <span style={{ "textDecoration": "none", "color": "black" }}> {item.name}</span></td>
                        <td><a target="_blank" href={`http://localhost:8000/${item.file}`} >{item.file}</a></td>
                        <td>{moment(item.created_at).format("dddd Do YYYY, h:mm:ss a")}</td>
                        <td>  <Link to={'#'} onClick={e => deleteDoc(e, item.id)} style={{ "textDecoration": "none", "color": "red" }}><Ai.AiFillDelete style={{ fill: "red" }} size={25} /></Link></td>
                    </tr>
                )
            }
        })
        tps = docs.map(item => {
            if (item.type === 'tp') {
                return (
                    <tr key={item.id} className=" text-center">
                        <td>   <span style={{ "textDecoration": "none", "color": "black" }}> {item.name}</span></td>
                        <td><a target="_blank" href={`http://localhost:8000/${item.file}`} >{item.file}</a></td>
                        <td>{moment(item.created_at).format("dddd Do YYYY, h:mm:ss a")}</td>
                        <td>  <Link to={'#'} onClick={e => deleteDoc(e, item.id)} style={{ "textDecoration": "none", "color": "red" }}><Ai.AiFillDelete style={{ fill: "red" }} size={25} /></Link></td>
                    </tr>
                )
            }
        })
        projets = docs.map(item => {
            if (item.type === 'projet') {
                return (
                    <tr key={item.id} className=" text-center">
                        <td>   <span style={{ "textDecoration": "none", "color": "black" }}> {item.name}</span></td>
                        <td><a target="_blank" href={`http://localhost:8000/${item.file}`} >{item.file}</a></td>
                        <td> <a target="_blank" href={item.link}>{item.link}</a></td>
                        <td>{moment(item.created_at).format("dddd Do YYYY, h:mm:ss a")}</td>
                        <td>  <Link to={'#'} onClick={e => deleteDoc(e, item.id)} style={{ "textDecoration": "none", "color": "red" }}><Ai.AiFillDelete style={{ fill: "red" }} size={25} /></Link></td>
                    </tr>
                )
            }
        })
        autres = docs.map(item => {
            if (item.type === 'autre') {
                return (
                    <tr key={item.id} className=" text-center">
                        <td>   <span style={{ "textDecoration": "none", "color": "black" }}> {item.name}</span></td>
                        <td><a target="_blank" href={`http://localhost:8000/${item.file}`} >{item.file}</a></td>
                        <td>{moment(item.created_at).format("dddd Do YYYY, h:mm:ss a")}</td>
                        <td>  <Link to={'#'} onClick={e => deleteDoc(e, item.id)} style={{ "textDecoration": "none", "color": "red" }}><Ai.AiFillDelete style={{ fill: "red" }} size={25} /></Link></td>
                    </tr>
                )
            }
        })
    }
    const deleteDoc = (e, id) => {
        e.preventDefault()
        const thisClicked = e.currentTarget
        thisClicked.innerText = "Deleting"
        axios.delete(`/api/delete_doc/${id}`).then(res => {
            if (res.data.status === 200) {
                thisClicked.closest("tr").remove()
                swal("Success", res.data.message, "success")
            }
            else if (res.data.status === 404) {
                thisClicked.innerText = "Deleting..."
            }
        })

    }
    return (
        <div className="container px-4" style={{ "zIndex": "-1" }}>
            <div className="card mt-4" style={{ "zIndex": "0.5" }}>
                <div className="card-header">
                    <h4>Module : {Module.name}
                        <Link to={"/delegate/add_doc/"+Module.id} className="btn btn-small float-end" style={{ "color": "white", "background": "orange" }}>Add Doc</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <ul className="nav nav-pills mb-3  justify-content-center" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="pills-cours-tab" data-bs-toggle="pill" data-bs-target="#pills-cours" type="button" role="tab" aria-controls="pills-cours" aria-selected="true">Cours</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-td-tab" data-bs-toggle="pill" data-bs-target="#pills-td" type="button" role="tab" aria-controls="pills-td" aria-selected="false">TDs</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-tp-tab" data-bs-toggle="pill" data-bs-target="#pills-tp" type="button" role="tab" aria-controls="pills-tp" aria-selected="false">TPs</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-projet-tab" data-bs-toggle="pill" data-bs-target="#pills-projet" type="button" role="tab" aria-controls="pills-projet" aria-selected="false">Projets</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-autre-tab" data-bs-toggle="pill" data-bs-target="#pills-autre" type="button" role="tab" aria-controls="pills-autre" aria-selected="false">Autres</button>
                        </li>
                    </ul>

                    <span className="tab-content" id="pills-tabContent">
                        <span className="tab-pane fade show active" id="pills-cours" role="tabpanel" aria-labelledby="pills-cours-tab">
                            <table className="table table-bordered table-hover">

                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>file</th>
                                        <th>Created at</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead><tbody>{cours}</tbody></table>
                        </span>
                        <span className="tab-pane fade" id="pills-td" role="tabpanel" aria-labelledby="pills-td-tab">
                            <table className="table table-bordered table-hover">

                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>file</th>
                                        <th>Created at</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead><tbody>{tds}</tbody>
                            </table>
                        </span>
                        <span className="tab-pane fade" id="pills-tp" role="tabpanel" aria-labelledby="pills-tp-tab">
                            <table className="table table-bordered table-hover">

                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>file</th>
                                        <th>Created at</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead><tbody>{tps}</tbody>
                            </table>                        </span>
                        <span className="tab-pane fade" id="pills-projet" role="tabpanel" aria-labelledby="pills-projet-tab">
                            <table className="table table-bordered table-hover">

                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>file</th>
                                        <th>Created at</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead><tbody>{projets}</tbody>
                            </table>
                        </span>
                        <span className="tab-pane fade" id="pills-autre" role="tabpanel" aria-labelledby="pills-autre-tab">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>file</th>
                                        <th>Created at</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead><tbody>{autres}</tbody>
                            </table>                        </span>
                    </span>

                </div>
            </div>
        </div>
    )
}
export default ViewCategories