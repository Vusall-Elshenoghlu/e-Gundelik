import React, { useEffect } from 'react'
import StudentSidebar from '../../components/Student/StudentSidebar'
import { Outlet, useNavigate } from 'react-router'

function StudentRoot() {
  const navigate = useNavigate()
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      toast.warning("Zəhmət olmasa daxil olun.");
      navigate("/teacher-login");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.role !== "Student") {
      toast.error("Sizin bu səhifəyə girişiniz yoxdur.");
      navigate("/teacher-login");
      return;
    }
  }, []);
  return (
    <>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <div style={{ width: "300px", position: "fixed" }}>
          <StudentSidebar />
        </div>

        <div style={{ flex: "1", background: "#f8f9fa", padding: "20px", backgroundColor: "#641E91" }}>
          <Outlet />
        </div>
      </div>

    </>
  )
}

export default StudentRoot
