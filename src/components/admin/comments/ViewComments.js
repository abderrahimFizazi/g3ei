import { Link } from 'react-router-dom'
import React, { useEffect ,useState} from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import * as Ai from "react-icons/ai"
import moment from 'moment'
const ViewComments = () => {
    const [Comments , setComments] = useState([])
    const [loading,setLoading] = useState(true)
    var view_Catgory_HTML_table = ""
    useEffect(() =>
        axios.get("/api/view_comments").then(res => {
            if(res.data.status===200){
                setComments(res.data.comment)
            }
            setLoading(false)
        })
        ,[])
        if(loading){
            return <h4>Loading Comments List...</h4>
        }
        else{
            const tablecategoeiesLength = Comments.length
            if(!tablecategoeiesLength){
                view_Catgory_HTML_table = <tr><td colspan="7" className='text-center'>No Comments Created for the moment</td></tr>
            }
            else{
            view_Catgory_HTML_table = Comments.reverse().map(item =>{
               var  CommentStatus = <Ai.AiOutlineEyeInvisible style={{ fill: "grey" }} size={25} />
                if (item.status === 1) {
                    CommentStatus = <Ai.AiOutlineEye style={{ fill: "grey" }} size={25} />
                }
                return (
                    <tr key={item.id} className=" text-center">
                        <td>{moment(item.dateCreated).format('MMMM Do')}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.body}</td>
                        <td>{CommentStatus}</td>
                        <td>{item.likes_nbr}</td>
                        <td>{item.dislike_nbr}</td>
                     <td>  <Link to={'#'}onClick={e => deleteComment(e,item.id)} style={{"textDecoration" : "none" , "color" : "red"}}><Ai.AiFillDelete style={{fill : "red"}} size={25}/></Link></td>

                    </tr>
                )
            })
        }
        }
        const deleteComment = (e, id) => {
            e.preventDefault()
            const thisClicked = e.currentTarget
            swal(" You really want to delete this Comment", {
                buttons: {
                    cancel: true,
                    deleteComment: true,
                },
            }).then(deletePost => {
                if (deletePost) {
                    thisClicked.innerText = "Deleting..."
                    axios.delete(`/api/delete_comment/${id}`).then(res => {
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
    return (
       <div className="container px-4" style={{"zIndex" : "-1"}}>
           <div className="card mt-4"style={{"zIndex" : "0.5"}}>
               <div className="card-header">
                   <h4>Comments List
                   </h4>
               </div>
               <div className="card-body">
                   <table className="table table-bordered table-hover">
                       <thead>
                           <tr>
                           <th>Created Time</th>
                               <th>Author</th>
                               <th>Email</th>
                               <th >Comment</th>
                               <th>Status</th>
                               <th className='text-center'><Ai.AiFillLike style={{fill : "orange"}} size={25} /></th>
                               <th className='text-center'><Ai.AiFillDislike style={{fill : "black"}} size={25} /></th>
                               <th>Delete</th>
                           </tr>
                       </thead>
                       <tbody>
                           {view_Catgory_HTML_table}
                       </tbody>
                   </table>
               </div>
           </div>
       </div>
    )
}
export default ViewComments