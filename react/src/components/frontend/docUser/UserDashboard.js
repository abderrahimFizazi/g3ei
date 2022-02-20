import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import * as Bi from "react-icons/bi"
import { useNavigate } from 'react-router'
const UserDashboard = () => {
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
        navigate("/documents/view_modules/" + id)
    }
    const logOut = () => {
                localStorage.removeItem("role")
                if(localStorage.getItem("semestre")){
                    localStorage.removeItem("semestre") 
                }
                swal("Success" , "Logged out successfully" , "success")
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4 style={{ "color": "rgb(255, 123, 0)" }}>Niveau
                      <a href='/'>  
                      <div className=" float-end" style={{ "color": "white" }} onClick={logOut} >
                            <Bi.BiLogOut style={{ fill: "orange" }} size={25} />Logout
                        </div>
                        </a>
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
export default UserDashboard