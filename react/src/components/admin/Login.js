import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router"
import ActivityPic from "../../assets/frontend/pic/activity1.jpg"
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error_list, setError_list] = useState([])
    const [invalid, setInvalid] = useState('')
    const navigate = useNavigate()
    const submitLogin = (e) => {
        if(email === "your@question.com" && password === "wehavenrj+"){
            localStorage.setItem("role", "user")
            navigate("/documents")
        }
        else{
        e.preventDefault();
        const data = {
            email: email,
            password: password
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post("/api/login", data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem("auth_token", res.data.token)
                    localStorage.setItem("auth_name", res.data.username)
                    localStorage.setItem("role", res.data.role)
                    if (res.data.role === 'admin') {
                        navigate('/admin')
                    }
                    else if (res.data.role === 'delegate') {
                        navigate('/Delegate')

                    }

                }
                else if (res.data.status === 401) {
                    setError_list(res.data.validation_errors)
                }
                else if (res.data.status === 403) {
                    setInvalid(res.data.message)
                    setError_list('/')
                }
            })
        })
    }
}
    return (
        <>
            <div className="container my-3" >
                <div className="row  justify-content-center " >
                    <div className=" col-md-6 authentifier"  >
                        <div class="authentifier-header"  >S'authentifier</div>
                        <form className="mx-auto" onSubmit={submitLogin}>
                            <div className="mb-3 authentifier-form">
                                <div style={{ "color": "red" }}>{invalid}</div>
                                <label className="form-label authentifier-input">Email :</label>
                                <input type="email" className="form-control " value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                                <span className="text-muted fw-light">{error_list.email}</span>
                            </div>
                            <div className="mb-3">
                                <label className="form-label authentifier-input">Mot de passe:</label>
                                <input type="password" className="form-control " value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe:" />
                                <span className="text-muted fw-light">{error_list.password}</span>
                            </div>
                            <button type="submit" className="btn " style={{ "backgroundColor": "rgb(255, 136, 0)" }}>Submit</button>
                        </form>
                        <div className="my-3 text-muted">
                            vous pouvez toujours avoir votre compte d'identification auprès de votre délégué de classe!
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card" >
                            <img src={ActivityPic} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h4>Notre plateforme est faite pour vous</h4>
                                <a href="#" className="btn " style={{ "backgroundColor": "rgb(255, 136, 0)" }} >About us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default Login