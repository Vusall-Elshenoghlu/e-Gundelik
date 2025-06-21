import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { FaTachometerAlt, FaCalendarAlt, FaUserMd, FaUsers } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Outlet } from "react-router-dom";

const AdminSidebar = () => {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", path: "", icon: <FaTachometerAlt className="me-2" /> },
    { name: "Teachers", path: "teachers", icon: <FaCalendarAlt className="me-2" /> },
    { name: "Add Teacher", path: "add-teacher", icon: <FaUserMd className="me-2" /> },
    { name: "Parents", path: "parents", icon: <FaUsers className="me-2" /> },
    { name: "Add Parent", path: "add-parent", icon: <FaUsers className="me-2" /> },
    { name: "Director", path: "director", icon: <FaUsers className="me-2" /> },
    { name: "Students", path: "students", icon: <FaUsers className="me-2" /> },
    { name: "Add Student", path: "add-student", icon: <FaUsers className="me-2" /> },
  ];

  return (
    <div className="d-flex">
      <div
        className="bg-light p-4 shadow-sm"
        style={{
          width: "260px",
          position: "fixed",
          top: "0",
          left: "0",
          bottom: "0",
          height: "100vh",  
          zIndex: "1000",
        }}
      >
        <ListGroup className="gap-3">
          {menuItems.map((item) => (
            <Link
              to={item.path}
              key={item.name}
              style={{ textDecoration: "none" }}
              onClick={() => setActive(item.name)}
            >
              <ListGroup.Item
                action
                className={`d-flex align-items-center rounded py-2 px-3 border-0 ${active === item.name
                  ? "bg-white shadow-sm border-start border-primary"
                  : "bg-light"
                  }`}
                style={{ transition: "0.3s ease-in-out", cursor: "pointer" }}
              >
                {item.icon} <span className="fw-semibold">{item.name}</span>
              </ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
      </div>

      <div style={{ marginLeft: "260px", height: "100vh" }}>
        <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
