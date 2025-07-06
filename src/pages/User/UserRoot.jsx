import React from 'react'
import UserNavbar from '../../components/User/UserNavbar'
import { Outlet } from 'react-router'
import UserFooter from '../../components/User/UserFooter'
import ScrollToTop from './ScrollToTop'

function UserRoot() {
  return (
    <>
      <UserNavbar/>
      <ScrollToTop/>
      <Outlet/>
      <UserFooter/>
    </>
  )
}

export default UserRoot
