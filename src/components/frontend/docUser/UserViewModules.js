import { Link } from 'react-router-dom'
import React, { useEffect ,useState} from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import * as Ai from "react-icons/ai"
import { useNavigate, useParams } from 'react-router'
const UserViewModules = () => {
    const [Module, setModule] = useState([])
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
    const {id} = useParams()
    var view_Catgory_HTML_table = ""
    useEffect(() =>
        axios.get(`/api/get_semestre_modules/${id}`).then(res => {
            if(res.data.status===200){
                setModule(res.data.message)
            }
            setLoading(false)
        })
        ,[])
        if(loading){
            return <h4>Loading Modules List...</h4>
        }
        else{
            const tablecategoeiesLength = Module.length
            if(!tablecategoeiesLength){
                view_Catgory_HTML_table = <tr><td colSpan="3" className='text-center'>No modules added for this Semestre :( </td></tr>
            }
            else{
            view_Catgory_HTML_table = Module.map(item =>{
                return (
                    <tr key={item.id} className=" text-center">
                    <td>   <Link to={'/documents/view_docs/'+ item.id}  className='btn level-s'> {item.name}</Link></td>
                        <td>{item.prof}</td>
                        <td>{item.description}</td>
                    </tr>
                )
            })
        }
        }
   
     const back = () => {
        if(localStorage.getItem("semestre")){
            localStorage.removeItem("semestre") 
        }        
     }
    return (
       <div className="container px-4" style={{"zIndex" : "-1"}}>
           <div className="card mt-4"style={{"zIndex" : "0.5"}}>
               <div className="card-header">
                   <h4>Semstre : {id}
                   <a href="/documents/dashboard"><button  className="btn mx-3 btn-small btn-secondary float-end"  onClick={back} >Back</button></a>
                   </h4>
               </div>
               <div className="card-body">
                   <table className="table table-bordered table-hover">
                       <thead>
                           <tr>
                               <th>Module</th>
                               <th>Prof</th>
                               <th>Description</th>
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
export default UserViewModules