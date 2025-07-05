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
  const [counts, setCounts] = useState({
    teachers: 0,
    parents: 0,
    students: 0,
    subjects: 0,
    director: 1, // statik
  });

  const [recentStudents, setRecentStudents] = useState([]);
  const [recentParents, setRecentParents] = useState([]);
  const [recentTeachers, setRecentTeachers] = useState([]);

  const navigate = useNavigate();

  // Base URL
  const baseURL = "https://turansalimli-001-site1.ntempurl.com/api";

  // Helper fetch functions
  const fetchTeachers = async () => {
    try {
      const res = await axios.get(`${baseURL}/User/teachers`);
      if (res.data.isSuccess) {
        setCounts((c) => ({ ...c, teachers: res.data.data.length }));
        // Son 5 müəllim (son tarixə görə sort yoxsa slice)
        setRecentTeachers(
          res.data.data
            .slice()
            .sort(
              (a, b) =>
                new Date(b.dob).getTime() - new Date(a.dob).getTime()
            )
            .slice(0, 5)
            .map((t) => ({
              id: t.id,
              name: `${t.firstName} ${t.lastName}`,
              createdAt: t.dob,
            }))
        );
      }
    } catch (error) {
      console.error("Teachers fetch error:", error);
    }
  };

  const fetchParents = async () => {
    try {
      const res = await axios.get(`${baseURL}/User/parents`);
      if (res.data.isSuccess) {
        setCounts((c) => ({ ...c, parents: res.data.data.length }));
        // Son 5 valideyn
        setRecentParents(
          res.data.data
            .slice()
            .sort(
              (a, b) =>
                new Date(b.dob).getTime() - new Date(a.dob).getTime()
            )
            .slice(0, 5)
            .map((p) => ({
              id: p.id,
              name: `${p.firstName} ${p.lastName}`,
              createdAt: p.dob,
            }))
        );
      }
    } catch (error) {
      console.error("Parents fetch error:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${baseURL}/User/students`);
      if (res.data.isSuccess) {
        setCounts((c) => ({ ...c, students: res.data.data.length }));
        // Son 10 tələbə
        setRecentStudents(
          res.data.data
            .slice()
            .sort(
              (a, b) =>
                new Date(b.dob).getTime() - new Date(a.dob).getTime()
            )
            .slice(0, 10)
            .map((s) => ({
              id: s.id,
              name: `${s.firstName} ${s.lastName}`,
              createdAt: s.dob,
            }))
        );
      }
    } catch (error) {
      console.error("Students fetch error:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await axios.get(`${baseURL}/Subject/GetAllSubject`);
      if (res.data) {
        setCounts((c) => ({ ...c, subjects: res.data.length || res.data.data.length }));
      }
    } catch (error) {
      console.error("Subjects fetch error:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchParents();
    fetchStudents();
    fetchSubjects();
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
                {counts[item.key] ?? "--"}
              </p>
              <p style={{ color: "gray", fontSize: "16px", fontWeight: "600" }}>
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex gap-4" style={{ maxWidth: "1000px" }}>
        {/* Son 10 tələbə */}
        <div className="card shadow-sm p-4 flex-fill">
          <h4 className="mb-4">Son 10 tələbə</h4>
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Ad Soyad</th>
                <th>Doğum Tarixi</th>
              </tr>
            </thead>
            <tbody>
              {recentStudents.map((student, idx) => (
                <tr key={student.id} style={{ cursor: "default" }}>
                  <td>{idx + 1}</td>
                  <td>{student.name}</td>
                  <td>
                    {new Date(student.createdAt).toLocaleDateString("az-AZ", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Son 5 valideyn */}
        <div className="card shadow-sm p-4 flex-fill">
          <h4 className="mb-4">Son 5 valideyn</h4>
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Ad Soyad</th>
                <th>Doğum Tarixi</th>
              </tr>
            </thead>
            <tbody>
              {recentParents.map((parent, idx) => (
                <tr key={parent.id} style={{ cursor: "default" }}>
                  <td>{idx + 1}</td>
                  <td>{parent.name}</td>
                  <td>
                    {new Date(parent.createdAt).toLocaleDateString("az-AZ", {
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
