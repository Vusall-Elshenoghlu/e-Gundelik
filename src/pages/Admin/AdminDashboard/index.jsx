import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaChalkboardTeacher,
  FaUserFriends,
  FaUserTie,
  FaChild,
  FaBook,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [dashData, setDashData] = useState(null);
  const [recentStudents, setRecentStudents] = useState([]);
  const [recentTeachers, setRecentTeachers] = useState([]);
  const navigate = useNavigate();

  const getDashData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/admin/dashboard");
      if (data.success) {
        setDashData(data.dashData);
      } else {
        console.error("Server error:", data.message);
      }
    } catch (err) {
      console.error("Request error:", err.message);
    }
  };

  useEffect(() => {
    getDashData();

    // Statik son 10 tələbə
    setRecentStudents([
      { id: 1, name: "Aysel Məmmədova", createdAt: "2025-06-20" },
      { id: 2, name: "Rəşad Hüseynov", createdAt: "2025-06-19" },
      { id: 3, name: "Nigar Əliyeva", createdAt: "2025-06-18" },
      { id: 4, name: "Elvin Quliyev", createdAt: "2025-06-17" },
      { id: 5, name: "Leyla Məmmədli", createdAt: "2025-06-16" },
      { id: 6, name: "Tural Səfərov", createdAt: "2025-06-15" },
      { id: 7, name: "Zeynəb İsmayılova", createdAt: "2025-06-14" },
      { id: 8, name: "Kamran Əliyev", createdAt: "2025-06-13" },
      { id: 9, name: "Fəridə Rzayeva", createdAt: "2025-06-12" },
      { id: 10, name: "Murad Məmmədov", createdAt: "2025-06-11" },
    ]);

    // Statik son 5 müəllim
    setRecentTeachers([
      { id: 1, name: "Ramil Əliyev", createdAt: "2025-06-19" },
      { id: 2, name: "Aygün Quliyeva", createdAt: "2025-06-18" },
      { id: 3, name: "Elşən Həsənov", createdAt: "2025-06-17" },
      { id: 4, name: "Nərmin Məmmədova", createdAt: "2025-06-16" },
      { id: 5, name: "Eldar Rzayev", createdAt: "2025-06-15" },
    ]);
  }, []);

  const cards = [
    {
      title: "Müəllimlər",
      key: "teachers",
      icon: <FaChalkboardTeacher size={50} />,
      path: "teachers",
    },
    {
      title: "Valideynlər",
      key: "parents",
      icon: <FaUserFriends size={50} />,
      path: "parents",
    },
    {
      title: "Direktor",
      key: "director",
      icon: <FaUserTie size={50} />,
      path: "director",
    },
    {
      title: "Şagirdlər",
      key: "students",
      icon: <FaChild size={50} />,
      path: "students",
    },
    {
      title: "Fənlər",
      key: "subjects",
      icon: <FaBook size={50} />,
      path: "subjects",
    },
  ];

  return (
    <div style={{ marginTop: "40px", marginLeft: "40px" }}>
      <h2 className="mb-4 fw-bold">İdarə Paneli</h2>

      <div className="d-flex flex-wrap gap-4 mb-5">
        {cards.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className="d-flex align-items-center bg-white p-4 rounded shadow-sm gap-3"
            style={{
              minWidth: "13rem",
              height: "7rem",
              cursor: "pointer",
              transition: "0.3s ease",
              transform: "scale(1)",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {item.icon}
            <div>
              <p style={{ fontSize: "30px", fontWeight: "500", color: "black" }}>
                {dashData?.[item.key] ?? "--"}
              </p>
              <p style={{ color: "gray", fontSize: "16px", fontWeight: "600" }}>
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex gap-4" style={{ maxWidth: "1000px" }}>
        <div className="card shadow-sm p-4 flex-fill">
          <h4 className="mb-4">Son 10 tələbə</h4>
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Ad Soyad</th>
                <th>Yaradılma Tarixi</th>
              </tr>
            </thead>
            <tbody>
              {recentStudents.map((student, idx) => (
                <tr key={student.id} style={{ cursor: "default" }}>
                  <td>{idx + 1}</td>
                  <td>{student.name}</td>
                  <td>
                    {new Date(student.createdAt).toLocaleDateString("az-AZ", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Son 5 Müəllim */}
        <div className="card shadow-sm p-4 flex-fill">
          <h4 className="mb-4">Son 5 müəllim</h4>
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Ad Soyad</th>
                <th>Yaradılma Tarixi</th>
              </tr>
            </thead>
            <tbody>
              {recentTeachers.map((teacher, idx) => (
                <tr key={teacher.id} style={{ cursor: "default" }}>
                  <td>{idx + 1}</td>
                  <td>{teacher.name}</td>
                  <td>
                    {new Date(teacher.createdAt).toLocaleDateString("az-AZ", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
};

export default AdminDashboard;
