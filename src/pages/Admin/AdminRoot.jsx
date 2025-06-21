import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import { Outlet } from 'react-router'

function AdminRoot() {
  return (
    <>
       
      <AdminSidebar/>
      <Outlet/>
    </>
  )
}

export default AdminRoot
