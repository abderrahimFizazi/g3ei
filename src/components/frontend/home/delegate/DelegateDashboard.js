import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import * as Bi from "react-icons/bi"
import { useNavigate } from 'react-router'
const DelegateDashboard = () => {
    const [semestre, SetSemestre] = useState()
    const semestres = [1, 2, 3, 4, 5, 6]
    const [stayConnected, setStatyConnected] = useState(false)
    const navigate = useNavigate()
    const goToSemetre = (id) => {
        if (stayConnected) {
            localStorage.setItem("semestre", id)
        }
        else {
            localStorage.removeItem("stayConnacted")
        }
        navigate("/delegate/view_modules/" + id)
    }
    const logOut = (e) => {
        e.preventDefault();
        axios.post("/api/logout").then(res => {
            if(res.data.status === 200){
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_name")
                localStorage.removeItem("role")
                if(localStorage.getItem("semestre")){
                    localStorage.removeItem("semestre") 
                }
                swal("Success" , res.data.message , "success")
            }
            navigate('/')
        })
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4 style={{ "color": "rgb(255, 123, 0)" }}>Niveau
                        <Link className=" float-end" to="#" style={{ "color": "white" }} onClick={logOut} >
                            <Bi.BiLogOut style={{ fill: "orange" }} size={25} />Logout
                        </Link>
                    </h4>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Selectionnez votre niveau svp : <span className='float-end '>Rester connectee a mon niveau:
                                    <input type="checkbox" className='mx-2' value={stayConnected} onChange={(e) => setStatyConnected(e.target.checked)} />
                                </span></th>

                            </tr>
                        </thead>
                        <tbody>
                            {semestres.map((item) => <tr><td><div className='level-s btn' onClick={() => goToSemetre(item)} >Semestre {item}</div></td></tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default DelegateDashboard