import React from 'react'
import UserNavbar from '../../components/User/UserNavbar'
import { Outlet } from 'react-router'
import UserFooter from '../../components/User/UserFooter'

function UserRoot() {
  return (
    <>
      <UserNavbar/>
      <Outlet/>
      <UserFooter/>
    </>
  )
}

export default UserRoot
