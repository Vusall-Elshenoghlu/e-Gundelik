import React, { useEffect } from 'react'
import StudentSidebar from '../../components/Student/StudentSidebar'
import { Outlet, useNavigate } from 'react-router'
import TeacherSidebar from '../../components/Teacher/TeacherSidebar'
import { toast } from 'react-toastify'

function TeacherRoot() {
  const navigate = useNavigate()
  const userData = localStorage.getItem("user");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      toast.warning("Zehmet olmasa daxil olun..");
      navigate("/teacher-login");
      return;
    }
    let user = JSON.parse(userData);
    if (user.role !== "Teacher") {
      toast.warning("Zehmet olmasa daxil olun..");
      navigate("/teacher-login");
    }
  }, [navigate]);
  return (
    <>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <div style={{ width: "300px", position: "fixed", }}>
          <TeacherSidebar />
        </div>

        <div style={{ flex: "1", background: "#f8f9fa", padding: "20px", backgroundColor: "#641E91" }}>
          <Outlet />
        </div>
      </div>

    </>
  )
}

export default TeacherRoot
