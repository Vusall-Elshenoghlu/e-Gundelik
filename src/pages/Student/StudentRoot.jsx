import React, { useEffect, useState } from 'react';
import StudentSidebar from '../../components/Student/StudentSidebar';
import { Outlet, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function StudentRoot() {
  const navigate = useNavigate();
  const [userChecked, setUserChecked] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        toast.warning("Zəhmət olmasa daxil olun.");
        navigate("/login");
        return;
      }

      const user = JSON.parse(storedUser);

      if (!user || user.role !== "Student") {
        toast.error("Sizin bu səhifəyə girişiniz yoxdur.");
        navigate("/login");
        return;
      }

      setUserChecked(true); // yalnız burdan sonra render olsun
    } catch (error) {
      toast.error("Xəta baş verdi. Yenidən daxil olun.");
      navigate("/login");
    }
  }, []);

  if (!userChecked) return null; // hələ yoxlamırsa heç nə göstərmə

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div style={{ width: "300px", position: "fixed" }}>
        <StudentSidebar />
      </div>

      <div style={{ flex: "1", backgroundColor: "#641E91", padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default StudentRoot;
