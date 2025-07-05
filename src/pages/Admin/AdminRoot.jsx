import React, { useEffect } from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import { Outlet, useNavigate } from 'react-router'
import { toast } from 'react-toastify';

function AdminRoot() {
  const navigate = useNavigate()
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      toast.warning("Zəhmət olmasa daxil olun.");
      navigate("/admin");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.role !== "Admin") {
      toast.error("Sizin bu səhifəyə girişiniz yoxdur.");
      navigate("/admin");
      return;
    }
  }, []);

  return (
    <>

      <AdminSidebar />
    </>
  )
}

export default AdminRoot
