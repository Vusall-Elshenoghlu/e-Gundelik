import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import ParentSidebar from '../../components/Parent/ParentSidebar';
import { toast } from 'react-toastify';

function ParentRoot() {
  const navigate = useNavigate()
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      toast.warning("Zəhmət olmasa daxil olun.");
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.role !== "Parent") {
      toast.error("Sizin bu səhifəyə girişiniz yoxdur.");
      navigate("/login");
      return;
    }

    setIsAuthorized(true);
    } catch (error) {
      toast.error("Xəta baş verdi. Yenidən daxil olun.");
      navigate("/login");
    }
  }, []); 
  return (
    <>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <div style={{ width: "300px", position: "fixed" }}>
          <ParentSidebar />
        </div>

        <div style={{ flex: "1", background: "#f8f9fa", padding: "20px", backgroundColor: "#641E91" }}>
          <Outlet />
        </div>
      </div>

    </>
  )
}

export default ParentRoot


