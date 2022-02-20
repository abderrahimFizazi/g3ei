import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import * as Ai from "react-icons/ai"
import moment from "moment";
const ViewPosts = () => {
    const [postList, setPostList] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get("/api/view_posts").then(res => {
            if (res.data.status === 200) {
                setPostList(res.data.post)
                setLoading(false)
            }
        })
    }, [])
    var tabel_html_product_list
    if (loading) {
        return (
            <h4>Post list loading...</h4>
        )
    }
    else {
        var PostStatus = ''
        tabel_html_product_list = postList.reverse().map(item => {
            if (item.status === 1) {
                PostStatus = <Ai.AiOutlineEye style={{ fill: "grey" }} size={25} />
            }
            else if (item.status === 0) {
                PostStatus = <Ai.AiOutlineEyeInvisible style={{ fill: "grey" }} size={25} />
            }
            return (
                <tr key={item.id}>
                    <td><Link to={"/admin/preview_post/" + item.id} style={{ "textDecoration": "none", "color": "black" }}>{item.name}</Link></td>
                    {item.category ? <td><Link to={"/admin/category_posts/"+ item.category_id} style={{ "textDecoration": "none", "color": "black" }}>{item.category.name}</Link></td> : <td className="text-muted">Category not found</td>}
                    <td>{item.sub_category}</td>
                    <td className="text-center"> <img src={`http://localhost:8000/${item.image}`} alt={`productimage${item.id}`} width="40px" /></td>
                    <td className="text-center"><Link to={"/admin/preview_post/" + item.id} style={{ "textDecoration": "none", "color": "red" }}>{PostStatus}</Link></td>
                    <td className="text-center"><Link to={`/admin/edit_post/${item.id}`}><Ai.AiOutlineEdit style={{ fill: "green" }} size={25} /></Link></td>
                    <td className="text-center"><Link to="#" onClick={e => deletePost(e, item.id)} style={{ "textDecoration": "none", "color": "red" }}><Ai.AiFillDelete style={{ fill: "red" }} size={25} /> </Link></td>
                    <td>{moment(item.dateCreated).format('MMMM Do')}</td>

                </tr>
            )
        })
        const deletePost = (e, id) => {
            e.preventDefault()
            const thisClicked = e.currentTarget
            swal(" You really want to delete this post", {
                buttons: {
                    cancel: true,
                    deletePost: true,
                },
            }).then(deletePost => {
                if (deletePost) {
                    thisClicked.innerText = "Deleting..."
                    axios.delete(`/api/delete_post/${id}`).then(res => {
                        if (res.data.status === 200) {
                            thisClicked.closest("tr").remove()
                        }
                        else if (res.data.status === 404) {
                            thisClicked.innerText = "Deleting..."
                        }
                    })
                }
            });
        }
    }
    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>
                        All Posts List
                        <Link to="/admin/add_post" className="btn btn-small float-end" style={{ "color": "white", "background": "orange" }}>Add Product</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <table className="table table-bordered  table-hover">
                        <thead>
                            <tr>
                                <th>Title </th>
                                <th> Category name </th>
                                <th> Sub_category </th>
                                <th> Image </th>
                                <th>Status </th>
                                <th> Edit </th>
                                <th> Delete </th>
                                <th>Date created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabel_html_product_list}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ViewPosts;