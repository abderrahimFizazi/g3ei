import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import "../../../assets/admin/preview.css"
import "../../../assets/admin/post_preview.css"
import moment from 'moment';

const PreviewPost = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [slug, setSlug] = useState('')
    const [image, setImage] = useState([])
    const [popular, setPopular] = useState('')
    const [category, setCategory] = useState('')
    const [body, setBody] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [subCategory, setSubCategory] = useState('')
    const [dateCreated, setDateCreated] = useState('')
    const [loading, setloading] = useState(true)
    const [popularPost, setPopularPost] = useState([])

    const { id } = useParams();

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
                        setSubCategory(res.data.post.sub_category)
                        setPopular(res.data.post.popular)
                        setImage(res.data.post.image)
                        setBody(res.data.post.body)
                        setDateCreated(res.data.post.created_at)
                        setloading(false)
                    }
                    else if (res.data.status === 422) {
                        swal("Error", res.data.message, "error")
                        navigate('/admin/view_posts')
                    }
                })
            }
        });
    }, [])
    useEffect(() => {
        axios.get("/api/get_popular_posts").then(res => {
            if (res.data.status === 200) {
                setPopularPost(res.data.post)
            }
        })
    }, [])
    if (loading) {
        return (
            <div>
                Loading post...
            </div>
        )
    }
    function createMarkup() {
        return { __html: body };
    }


    return (<div>
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-8">
                <article>
                        <header className="mb-4">
                            <h1 className="fw-bolder mb-1">{name}</h1>
                            <h5 className='mb-2'>{subCategory}</h5>
                            <div className='text-muted'>{moment(dateCreated).format('MMMM Do YYYY')} </div>
                        </header>
                        <div class="gallery">
                            <img src={`http://localhost:8000/${image}`} alt={slug} width="700px" className="img-fluid" />
                            <div class="desc">{description}</div>
                        </div>
                        <div className='my-2'>
                            <div dangerouslySetInnerHTML={createMarkup()} />
                        </div>
                    </article>        
                    <section className="mb-5">
                        <div className="card bg-light">
                            <div className="card-body">
                                <form className="mb-4">
                                    <textarea className="form-control" rows="3" placeholder="Join the discussion and leave a comment!">
                                    </textarea>
                                </form>
                                <div className="d-flex mb-4">
                                    <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                    <div className="ms-3">
                                        <div className="fw-bold">Commenter Name</div>
                                        If you're going to lead a space frontier, it has to be government; it'll never be private enterprise. Because the space frontier is dangerous, and it's expensive, and it has unquantified risks.
                                        <div className="d-flex mt-4">
                                            <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                            <div className="ms-3">
                                                <div className="fw-bold">Commenter Name</div>
                                                And under those conditions, you cannot establish a capital-market evaluation of that enterprise. You can't get investors.
                                            </div>
                                        </div>
                                        <div className="d-flex mt-4">
                                            <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                            <div className="ms-3">
                                                <div className="fw-bold">Commenter Name</div>
                                                When you put money directly to a problem, it makes a good headline.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                    <div className="ms-3">
                                        <div className="fw-bold">Commenter Name</div>
                                        When I look at the universe and all the ways the universe wants to kill us, I find it hard to reconcile that with statements of beneficence.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="col-lg-4">
                    <div className="card mb-4">
                        <div className="card-header">Search</div>
                        <div className="card-body">
                            <div className="input-group">
                                <input className="form-control" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                                <button className="btn" style={{ "backgroundColor": "orange", "color": "white" }}>Go!</button>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-header">Popular posts</div>
                        <div className="card-body">
                            {popularPost.reverse().map(item => {
                                return (
                                  item.id != id ?  <div className='post_preview_link' style={{ "borderBottom": "1px lightgray solid" }} key={item.id}>
                                        <a href={"/admin/preview_post/" + item.id} >{item.name}
                                        <span className='float-end fw-light'>{moment(dateCreated).format('MMMM Do')}</span>
                                        </a>
                                        <div className='text-muted'>
                                            {item.slug}
                                        </div>
                                    </div> : null
                                )
                            }
                            )}
                        </div>
                    </div>

                    <div className="card mb-4">
                        <div className="card-header">Categories</div>
                        <div className="card-body">
                            <div className="row">
                                {categoryList.map(item => {
                                    if (item.status) {
                                        return (
                                            <div className='post_preview_link col-md-6'>
                                                <Link to={"/admin/category_posts/" + item.id} key={item.id}> {item.name}</Link>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default PreviewPost;
