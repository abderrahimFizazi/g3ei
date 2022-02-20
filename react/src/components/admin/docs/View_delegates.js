import { Link } from 'react-router-dom'
import React, { useEffect ,useState} from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import * as Ai from "react-icons/ai"
const ViewDelegates = () => {
    const [delegate , setDelegate] = useState([])
    const [loading,setLoading] = useState(true)
    var view_Catgory_HTML_table = ""
    useEffect(() =>
        axios.get("/api/get_all_users").then(res => {
            if(res.data.status===200){
                setDelegate(res.data.user)
            }
            setLoading(false)
        })
        ,[])
        if(loading){
            return <h4>Loading Category List...</h4>
        }
        else{
            const tablecategoeiesLength = delegate.length
            if(!tablecategoeiesLength){
                view_Catgory_HTML_table = <tr><td colspan="7" className='text-center'>No delegates Created :( Add some to create documents</td></tr>
            }
            else{
                var id = 0
            view_Catgory_HTML_table = delegate.map(item =>{
                id++
                return (
                    <tr key={item.id} className=" text-center">
                   <td>{id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                    {item.id==1 ?  <td> <Ai.AiFillDelete style={{fill : "grey"}} size={25}/></td> :
                     <td>  <Link to={'#'}onClick={e => deleteUser(e,item.id)} style={{"textDecoration" : "none" , "color" : "red"}}>
                         <Ai.AiFillDelete style={{fill : "red"}} size={25}/></Link></td>}
                    </tr>
                )
            })
        }
        }
        const deleteUser = (e, id) => {
            e.preventDefault()
            const thisClicked = e.currentTarget
            swal(" You really want to delete this delegate", {
                buttons: {
                    cancel: true,
                    deleteDelegate: true,
                },
            }).then(deletePost => {
                if (deletePost) {
                    thisClicked.innerText = "Deleting..."
                    axios.delete(`/api/delete_user/${id}`).then(res => {
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
                   <h4>Delegates List
                   <Link to="/admin/add_delegate" className="btn btn-small float-end"  style={{"color" : "white" , "background" : "orange"}}>New delegate</Link>
                   </h4>
               </div>
               <div className="card-body">
                   <table className="table table-bordered table-hover">
                       <thead>
                           <tr>
                               <th>ID</th>
                               <th>Name</th>
                               <th>Email</th>
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
export default ViewDelegates