import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import Masterlayout from './layouts/admin/Masterlayout'
import swal from 'sweetalert'
const Adminprivateroute = () => {
    const navigate = useNavigate()
    const [authantifacated, setAuthantifacated] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get("/api/chekingAuthentificated").then(res => {
            if (res.status === 200) {
                setAuthantifacated(true)
            }
            setLoading(false)
        })
    }, [])
    axios.interceptors.response.use(undefined, function axiosRetryInterceptors(err) {
        if (err.response.status === 401) {
            swal("Unauthorized" ,err.response.data.message , "warning" )
            navigate("/403")
        }
        return Promise.reject(err)
    })
    axios.interceptors.response.use(function (err) {return err} , function (error){
        if (error.response.status === 403) {
            swal("Forbedden" ,error.response.data.message , "warning" )
            navigate("/403")
        }
        if (error.response.status === 404) {
            swal("Not Found" ,"Url/Page not found :(", "warning" )
            navigate("/404")
        }
        return Promise.reject(error)

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
        authantifacated ? <Masterlayout /> : <Navigate to="/login" />
    )
}
export default Adminprivateroute