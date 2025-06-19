import React from 'react'
import StudentSidebar from '../../components/Student/StudentSidebar'
import { Outlet } from 'react-router'

function StudentRoot() {
  return (
    <>
        <div style={{display:"flex", minHeight: "100vh"}}>
            <div style={{width:"300px", position:"fixed"}}>
                <StudentSidebar/>
            </div>

            <div style={{flex:"1", background:"#f8f9fa", padding:"20px",backgroundColor:"#641E91"}}>
                <Outlet/>
            </div>
        </div> 
      
    </>
  )
}

export default StudentRoot
