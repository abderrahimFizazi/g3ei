import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../../../layouts/frontend/Navbar'

function UserDocMaster() {
  return (
      <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default UserDocMaster