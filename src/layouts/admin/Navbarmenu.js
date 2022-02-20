import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import *  as Cg from "react-icons/cg";
import * as Bi from 'react-icons/bi'
import * as Ai from 'react-icons/ai'

import axios from 'axios';
import { useNavigate } from 'react-router';
function Navbarmenu() {
    const navigate = useNavigate()
    const logOut = (e) => {
        e.preventDefault();
        axios.post("/api/logout").then(res => {
            if(res.data.status === 200){
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_name")
                localStorage.removeItem("role")
            }
            navigate('/')
        })
    }
    const adminName = localStorage.getItem("auth_name")
    const [drop , setDrop] = useState(false)
    const showDrop =() => setDrop(!drop) ;
    return (
        <>
    <div style={{ "color": "#f1f1f1" }}>
        <div className="dropdown" style={{"marginRight" : "80px"}}>
        {/* <div className='text-end'><Link to="/admin/add_post" style={{"color":"white" , "textDecoration" : "none"}} >Add Post <Ai.AiFillFileAdd/></Link></div> */}

            <div className=" dropdown-toggle p-2 " type="button" onClick={showDrop}>
            {adminName} <Cg.CgProfile/>
            </div>
            <div className={drop ? "dropdown-menu show " : "dropdown-menu " }  >
                                <Link className="dropdown-item" to="#">
                                    Profile
                                </Link>
                                <Link className="dropdown-item" to="#">
                                    Settings
                                </Link>
                                <Link className="dropdown-item" to="#">
                                    Activity Log
                                </Link>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to="#" onClick={logOut} >
                                    <Bi.BiLogOut style={{fill : "black"}} size={25}/> Logout
                                </Link>
            </div>
        </div>
    </div>
    </>)
}

export default Navbarmenu;
