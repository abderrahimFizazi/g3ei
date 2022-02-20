import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import Masterlayout from './layouts/admin/Masterlayout'
import swal from 'sweetalert'
import DelegateMaster from "./components/frontend/home/delegate/DelegateMaster";
const Delegateprivateroute = () => {
    const navigate = useNavigate()
    const [authantifacated, setAuthantifacated] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get("/api/checkdAuthentificatedDelegate").then(res => {
            if (res.status === 200) {
                setAuthantifacated(true)
            }
            setLoading(false)
        })
    }, [])
    axios.interceptors.response.use(undefined, function axiosRetryInterceptors(err) {
        if (err.response.status === 401) {
            swal("Unauthorized" ,err.response.data.message , "warning" )
            navigate("/401")
        }
        return Promise.reject(err)
    })

    if (loading) {
        return (
            <div className="position-absolute top-50 start-50 translate-middle">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
    return (
        authantifacated ? <DelegateMaster /> : <Navigate to="/login" />
    )
}
export default Delegateprivateroute