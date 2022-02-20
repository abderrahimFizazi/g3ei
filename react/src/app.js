import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './components/admin/Dashboard'
import "./App.css"
import Login from './components/admin/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import axios from 'axios'
import { Navigate } from "react-router";
import Adminprivateroute from './Adminprivateroute'
import AddCategory from './components/admin/categories/AddCategory'
import ViewCategories from './components/admin/categories/ViewCategories'
import Edit_category from './components/admin/categories/EditCategory'
import AddPost from './components/admin/posts.js/AddPost'
import EditPost from './components/admin/posts.js/EditPost'
import ViewPosts from './components/admin/posts.js/ViewPosts'
import PreviewPost from './components/admin/posts.js/PreviewPost'
import ViewComments from './components/admin/comments/ViewComments'
import CategoryPosts from './components/admin/categories/CategoryPosts'
import AddDelegates from "./components/admin/docs/AddDelegate"
import Page404 from './errors/404'
import Page401 from './errors/Page401'
import Page403 from './errors/Page403'
import ViewDelegates from './components/admin/docs/View_delegates'
import MasterLayout from './layouts/frontend/MasterLayout'
import Home from './components/frontend/home/Home'
import Contactus from './layouts/frontend/Contactus'
import DelegateDashboard from './components/frontend/home/delegate/DelegateDashboard'
import Delegateprivateroute from './Delegateprivateroute'
import AddModule from './components/frontend/home/delegate/AddModule'
import ViewModules from './components/frontend/home/delegate/ViewModules'
import EditModule from './components/frontend/home/delegate/EditModule'
import View_docs from './components/frontend/doc/View_docs'
import AddDoc from './components/frontend/doc/Add_doc'
import UserDashboard from './components/frontend/docUser/UserDashboard'
import UserDocMaster from './components/frontend/docUser/UserDocMaster'
import UserViewModules from './components/frontend/docUser/UserViewModules'
import UserViewDocs from './components/frontend/docUser/UserViewDocs'
import BlogMaster from './components/frontend/blog/BlogMaster'
axios.defaults.baseURL = "http://localhost:8000/"
axios.defaults.headers.post["Accept"] = "application/json"
axios.defaults.headers.post["Content-Type"] = "application/json"
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("auth_token")
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
})


const App = () => {
    const userState = localStorage.getItem("role")
    var auth = ''
    
    if( userState === "admin"){
        auth = "/admin"
    }
    if(userState  === "delegate"){
        auth = '/delegate'
    }
    if(userState === "user"){
        auth = "/documents"
    }
    return (
        <Router>
            <Routes>

                <Route path="404" element={<Page404 />} />
                <Route path="401" element={<Page401 />} />
                <Route path="403" element={<Page403 />} />

                <Route path="/admin" element={<Adminprivateroute />}>
                    <Route path="" element={<Navigate replace to="dashboard" />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="add_category" element={<AddCategory />} />
                    <Route path="view_categories" element={<ViewCategories />} />
                    <Route path="edit_category/:id" element={<Edit_category />} />
                    <Route path="add_post" element={<AddPost />} />
                    <Route path="edit_post/:id" element={<EditPost />} />
                    <Route path="view_posts" element={<ViewPosts />} />
                    <Route path="preview_post/:id" element={<PreviewPost />} />
                    <Route path="view_comments" element={<ViewComments />} />
                    <Route path="category_posts/:id" element={<CategoryPosts />} />
                    <Route path="view_delegates" element={<ViewDelegates />} />
                    <Route path="add_delegate" element={<AddDelegates />} />
                </Route>
                <Route path="/" element={<MasterLayout />}>
                    <Route path="" element={<Home />} />
                    <Route path="login" element={auth ? <Navigate replace to={auth}  />  : <Login/>} />
                    <Route path="contactus" element={<Contactus />} />
                </Route>

                <Route path='/delegate' element={<Delegateprivateroute />}>
                    <Route path="" element={<Navigate replace to="dashboard" />} />
                    <Route path="dashboard" element={localStorage.getItem("semestre") ? <Navigate replace to={"/delegate/view_modules/" + localStorage.getItem("semestre")} /> : <DelegateDashboard />} />
                    <Route path="view_modules/:id" element={<ViewModules />} />
                    <Route path="add_module" element={<AddModule />} />
                    <Route path="edit_module/:id" element={<EditModule />} />
                    <Route path="view_docs/:id" element={<View_docs />} />
                    <Route path="add_doc/:id" element={<AddDoc />} />
                </Route>

                <Route path="/documents" element={localStorage.getItem("role") ? <UserDocMaster /> : <Navigate replace to={"/login" } /> }>
                    <Route path="" element={<Navigate replace to="dashboard" />} />
                    <Route path='dashboard'  element={localStorage.getItem("semestre") ? <Navigate replace to={"/documents/view_modules/" + localStorage.getItem("semestre")} /> : <UserDashboard />}/>
                    <Route path="view_modules/:id" element={<UserViewModules/>} />
                    <Route path="view_docs/:id" element={<UserViewDocs/>}/>
                </Route>
                <Route path="/blog" element={<BlogMaster/>}/>
            </Routes>
        </Router>
    )
}


export default App