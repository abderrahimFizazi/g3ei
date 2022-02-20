import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useState } from "react";
import axios from "axios";
import { Route, useNavigate } from "react-router";
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "../../../assets/admin/post.css"
import * as Ai from "react-icons/ai"

const AddPost = () => {

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [slug, setSlug] = useState('')
    const [status, setStatus] = useState('')
    const [image, setImage] = useState([])
    const [popular, setPopular] = useState('')
    const [category, setCategory] = useState('')
    const [body, setBody] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [error_list, setError_list] = useState([])
    const [isOpen, setIsopen] = useState(false)
    const [subCategory, setSubCategory] = useState('')
    const [categoryName, setCategoryName] = useState('')

    /* DropDown I know there is a lot of way to create this but I dont know how yet, indeed I dont have time , indeed I dont care*/
    const Dropdown = () => {
        return (
            <>
                <div
                    className={isOpen ? "dropdown2 active " : "dropdown2"}
                    onClick={() => setIsopen(!isOpen)} >
                    <div className="dropdown2__text">
                        {!categoryName ? "Select Category*" : categoryName}
                    </div>
                    {isOpen ? categoryList.map(item => {
                        if (item.status) {
                            return (
                                <div className="dropdown2__item" key={item.id} value={item.id} onClick={() => { setCategory(item.id); setCategoryName(item.name); console.log(category) }}> {item.name}</div>
                            )
                        }
                    }) : null
                    }
                </div>
            </>
        )
    }

    const handleImage = (e) => {
        setImage({ productImage: e.target.files[0] })
    }
    useEffect(() => {
        axios.get("/api/view_categories").then(res => {
            if (res.data.status === 200) {
                setCategoryList(res.data.category)
            }
        });

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("image", image.productImage)
        data.append("name", name)
        data.append("slug", slug)
        data.append("category_id", category)
        data.append("body", body)
        data.append("sub_category", subCategory)
        description ? data.append("description", description) : data.append("description", '')
        data.append("status", status)
        popular ? data.append("popular", "1") : data.append("popular", "0")
        status ? data.append("status", "1") : data.append("status", "0")
        axios.post("/api/add_post", data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success")
                navigate("/admin/view_posts")
            }
            else if (res.data.status === 400) {
                setError_list(res.data.errors)
            }
        })
    }


    return (
        <div className="container-fluid px-4  m-2">
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-9"><h2>Add Post</h2></div>
                    <div className="col-md-3 ">
                        <button type="submit" className="btn float-end" style={{ "width": "110px", "backgroundColor": "orange", "color": "white" }}> <Ai.AiOutlineFileAdd style={{ fill: "white" }} size={25} /> Submit </button>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-9 mb-3">
                        <input type="text" name="name" onChange={e => setName(e.target.value)} value={name} className="form-control border border-0 border-bottom border-warning border-2 " placeholder="title*" />
                        <span style={{ color: "red" }}>{error_list.name}</span>
                    </div>
                    <div className="col-md-3">
                        <label className="container2">Status  (Checked = shown)
                            <input type="checkbox" onChange={e => setStatus(e.target.checked)} defaultChecked={status ? true : false} />
                            <span className="checkmark"></span>
                        </label>

                    </div>
                    <div className="col-md-9 shadow-none p-3 mb-5 bg-light rounded"  >
                        <div className=" card">
                            <div>
                                <Editor
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onEditorStateChange={e => setBody(draftToHtml(convertToRaw(e.getCurrentContent())))}
                                />
                            </div>
                            <span style={{ color: "red" }}>{error_list.body}</span>
                        </div>
                    </div>
                    <div className="col-md-3 shadow p-3 mb-5 bg-body rounded">
                        <div style={{ "color": "orange" }} className="mx-2 fs-5">Category :</div>
                        <Dropdown />
                        <span style={{ color: "red" }}>{error_list.category_id}</span>
                        <div className="my-3">
                            <div style={{ "color": "orange" }} className="mx-2 fs-5">Sub_category :</div>
                            <input type="text" name="sub_category" onChange={e => setSubCategory(e.target.value)} className="form-control" value={subCategory} placeholder="sub_category" className="form-control border border-0 border-bottom border-warning border-2 " style={{ "width": "250px" }} />
                        </div>
                        <div className="my-3">
                            <div style={{ "color": "orange" }} className="mx-2 fs-5">Slug :</div>
                            <input type="text" name="slug" onChange={e => setSlug(e.target.value)} className="form-control" value={slug} placeholder="Slug*" className="form-control border border-0 border-bottom border-warning border-2 " style={{ "width": "250px" }} />
                            <span style={{ color: "red" }}>{error_list.slug}</span>                        </div>
                        <span className=" text-muted m-3" >Image :</span>
                        <input type="file" onChange={handleImage} className="form-control my-2" />
                        <span style={{ color: "red" }}>{error_list.image}</span>
                        <div className="my-3">
                            <div style={{ "color": "orange" }} className="mx-2 fs-5">Image description :</div>
                            <input type="text" name="description" onChange={e => setDescription(e.target.value)} className="form-control  my-3" value={description} placeholder="description" className="form-control border border-0 border-bottom border-warning border-2 " style={{ "width": "250px" }} />
                        </div>
                        <label className="container2">Popular
                            <input type="checkbox" onChange={e => setPopular(e.target.checked)} defaultChecked={popular ? true : false} />
                            <span className="checkmark"></span>
                        </label>
                    </div>

                </div>
            </form>

        </div>
    )
}
export default AddPost