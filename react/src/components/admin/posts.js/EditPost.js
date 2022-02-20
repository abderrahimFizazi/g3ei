import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "../../../assets/admin/post.css"
import * as Ai from "react-icons/ai"

const EditPost = () => {

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
    const [displayImage, setDisplayImage] = useState(true)
    const [categoryName, setCategoryName] = useState(true)
    const [displayCheckBox, setDisplayCheckBox] = useState(false)
    const { id } = useParams()
    /* DropDown I know there is a lot of way to create this but I dont know how yet, indeed I dont have time , indeed I dont care*/
    const Dropdown = () => {
        return (
            <>
                <div
                    className={isOpen ? "dropdown2 active " : "dropdown2"}
                    onClick={() => setIsopen(!isOpen)} >
                    <div className="dropdown2__text">
                       {categoryName}
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
        setImage({ postImage: e.target.files[0] })
        setDisplayImage(false)
    }
    useEffect(() => {
        axios.get("/api/view_categories").then(res => {
            if (res.data.status === 200) {
                setCategoryList(res.data.category)
                axios.get(`/api/edit_post/${id}`).then(res => {
                    if (res.data.status === 200) {
                        setName(res.data.post.name)
                        setCategory(res.data.post.category_id)
                        res.data.post.description ? setDescription(res.data.post.description) : setDescription('');
                        setSlug(res.data.post.slug)
                        setStatus(res.data.post.status)
                        setPopular(res.data.post.popular)
                        setImage(res.data.post.image)
                        setBody(body)
                        setCategoryName(res.data.category.name)
                        setDisplayCheckBox(true)
                    }
                    else if (res.data.status === 422) {
                        swal("Error", res.data.message, "error")
                        navigate('/admin/add_post')
                    }
                })
            }
        });
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            "image": image.productImage,
            "name": name,
            "description": description,
            "slug": slug,
            "category_id": category,
            "body": body,
            "sub_category": subCategory,
            "status": status,
            "popular": popular
        }

        axios.put(`/api/update_post/${id}`, data).then(res => {
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
                    <div className="col-md-9"><h2>Edit Post</h2></div>
                    <div className="col-md-3">
                        <Link to={"/admin/preview_post/" + id} className="btn btn-light mx-1" style={{ "width": "110px" }}>
                            <Ai.AiOutlineEye style={{ fill: "grey" }} size={25} /> Preview
                        </Link>
                        <button type="submit" className="btn " style={{ "width": "110px", "backgroundColor": "orange", "color": "white" }}> <Ai.AiOutlineFileAdd style={{ fill: "white" }} size={25} /> Submit </button>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-9 mb-3">
                        <input type="text" name="name" onChange={e => setName(e.target.value)} value={name} className="form-control border border-0 border-bottom border-warning border-2 " placeholder="Title" />
                        <span style={{ color: "red" }}>{error_list.name}</span>
                    </div>
                    {displayCheckBox ?
                        <div className="col-md-1 fs-5">
                            <input type="checkbox" name="status" onChange={e => setStatus(e.target.checked)} defaultChecked={status} /> Status

                        </div> : null}
                    {displayCheckBox ?
                        <div className=" col-md-1 fs-5">
                            <input type="checkbox" name="status" onChange={e => setPopular(e.target.checked)} defaultChecked={popular} />Popular
                        </div>
                        : null
                    }
                    <div className="col-md-9 shadow-none p-3 mb-5 bg-light rounded"  >
                        <div className=" card">
                            <Editor
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={e => setBody(draftToHtml(convertToRaw(e.getCurrentContent())))}
                            />
                            <span className="text-muted">you can copy the old text here so you can updated it, else leave it empty!</span>
                        </div>
                    </div>
                    <div className="col-md-3 shadow p-3 mb-5 bg-body rounded">
                        {displayImage ? <img src={`http://localhost:8000/${image}`} alt={slug} width="270px" className="mb-3" /> : null}
                        <div className="my-3">
                            <div style={{ "color": "orange" }} className="mx-2 fs-5">Image description :</div>
                            <input type="text" name="description" onChange={e => setDescription(e.target.value)} className="form-control  my-3" value={description} placeholder="description" className="form-control border border-0 border-bottom border-warning border-2 " style={{ "width": "250px" }} />
                        </div>
                        <div style={{ "color": "orange" }} className="mx-2 fs-5">Category :</div>
                        <Dropdown />
                        <div className="my-3">
                            <div style={{ "color": "orange" }} className="mx-2 fs-5">Sub_category :</div>
                            <input type="text" name="sub_category" onChange={e => setSubCategory(e.target.value)} className="form-control" value={subCategory} placeholder="sub_category" className="form-control border border-0 border-bottom border-warning border-2 " style={{ "width": "250px" }} />
                        </div>
                        <div className="my-3">
                            <div style={{ "color": "orange" }} className="mx-2 fs-5">Slug :</div>
                            <input type="text" name="slug" onChange={e => setSlug(e.target.value)} className="form-control" value={slug} placeholder="Slug*" className="form-control border border-0 border-bottom border-warning border-2 " style={{ "width": "250px" }} />
                            <span style={{ color: "red" }}>{error_list.slug}</span>                        </div>
                        <span style={{ color: "red" }}>{error_list.image}</span>
                    </div>

                </div>
            </form>
        </div>
    )
}
export default EditPost