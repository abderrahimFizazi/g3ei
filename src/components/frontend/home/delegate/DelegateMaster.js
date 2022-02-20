import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../../../../layouts/frontend/Footer'
import Navbar from "../../../../layouts/frontend/Navbar"
function DelegateMaster() {
    return (
        <div>
            <Navbar/>
            <Outlet />
        </div>
    )
}

export default DelegateMaster