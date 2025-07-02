import React, { useEffect, useState } from "react";
import { useAxiosWithAuth } from "../../../hooks/UseAxiosWithAuth";

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const axiosAuth = useAxiosWithAuth();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axiosAuth.get("/api/teachers");
        setTeachers(res.data);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchTeachers();
  }, [axiosAuth]);

  return (
    <ul>
      {teachers.map((t) => (
        <li key={t.id}>{t.name}</li>
      ))}
    </ul>
  );
};

export default AdminTeachers;
