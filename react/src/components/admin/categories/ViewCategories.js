import { Link } from 'react-router-dom'
import React, { useEffect ,useState} from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import * as Ai from "react-icons/ai"
const ViewCategories = () => {
    const [Category , setCategory] = useState([])
    const [loading,setLoading] = useState(true)
    var view_Catgory_HTML_table = ""
    useEffect(() =>
        axios.get("/api/view_categories").then(res => {
            if(res.data.status===200){
                setCategory(res.data.category)
            }
            setLoading(false)
        })
        ,[])
        if(loading){
            return <h4>Loading Category List...</h4>
        }
        else{
            const tablecategoeiesLength = Category.length
            if(!tablecategoeiesLength){
                view_Catgory_HTML_table = <tr><td colspan="7" className='text-center'>No categories Created :( Add some to create posts</td></tr>
            }
            else{
            view_Catgory_HTML_table = Category.map(item =>{
                var status = "Hidden"
                if(item.status === 1 ){
                    status = "Shown"
                }
                return (
                    <tr key={item.id} className=" text-center">
                                                <td>{item.id}</td>
                    <td>   <Link to={"/admin/category_posts/"+ item.id}  style={{"textDecoration" : "none" , "color" : "black"}}> {item.name}</Link></td>
                        <td>{item.description}</td>
                        <td>{status}</td>
                       <td  >  <Link to={`/admin/edit_category/${item.id}`} ><Ai.AiOutlineEdit style={{fill : "green"}} size={25}/></Link></td>
                      <td>  <Link to={'#'}onClick={e => deleteCategory(e,item.id)} style={{"textDecoration" : "none" , "color" : "red"}}><Ai.AiFillDelete style={{fill : "red"}} size={25}/></Link></td>
                    </tr>
                )
            })
        }
        }
     const deleteCategory = ( e , id) => {
         e.preventDefault()
         const thisClicked = e.currentTarget
         thisClicked.innerText = "Deleting"
         axios.delete(`/api/delete_category/${id}`).then(res => {
             if(res.data.status === 200){
                 thisClicked.closest("tr").remove()
                 swal("Success",res.data.message,"success")

             }
             else if(res.data.status === 404){
                thisClicked.innerText = "Deleting..."
             }
         })

     }
    return (
       <div className="container px-4" style={{"zIndex" : "-1"}}>
           <div className="card mt-4"style={{"zIndex" : "0.5"}}>
               <div className="card-header">
                   <h4>Category List
                   <Link to="/admin/add_category" className="btn btn-small float-end"  style={{"color" : "white" , "background" : "orange"}}>Add Category</Link>
                   </h4>
               </div>
               <div className="card-body">
                   <table className="table table-bordered table-hover">
                       <thead>
                           <tr>
                               <th>ID</th>
                               <th>Name</th>
                               <th>Description</th>
                               <th>Status</th>
                               <th>Edit</th>
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
export default ViewCategories