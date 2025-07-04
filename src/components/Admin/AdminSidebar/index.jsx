import { useContext, useState } from "react";
import { ListGroup } from "react-bootstrap";
import Swal from "sweetalert2"
import {
  FaTachometerAlt,
  FaUserTie,
  FaUserPlus,
  FaUserFriends,
  FaChild,
  FaBook,
  FaPlusCircle,
  FaSignOutAlt,
  FaChalkboardTeacher,
  FaLayerGroup
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const AdminSidebar = () => {
  const [active, setActive] = useState("İdarə paneli");
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext)
  const menuItems = [
    { name: "İdarə paneli", path: "", icon: <FaTachometerAlt className="me-2" /> },
    { name: "Müəllimlər", path: "teachers", icon: <FaChalkboardTeacher className="me-2" /> },
    { name: "Müəllim əlavə et", path: "add-teacher", icon: <FaUserPlus className="me-2" /> },
    { name: "Validyenlər", path: "parents", icon: <FaUserFriends className="me-2" /> },
    { name: "Valideyn əlavə et", path: "add-parent", icon: <FaUserPlus className="me-2" /> },
    { name: "Direktor", path: "director", icon: <FaUserTie className="me-2" /> },
    { name: "Şagirdlər", path: "students", icon: <FaChild className="me-2" /> },
    { name: "Şagird əlavə et", path: "add-student", icon: <FaUserPlus className="me-2" /> },
    { name: "Fənlər", path: "subjects", icon: <FaBook className="me-2" /> },
    { name: "Fənn əlavə et", path: "add-subject", icon: <FaPlusCircle className="me-2" /> },
    { name: "Siniflər", path: "classes", icon: <FaLayerGroup className="me-2" /> },
    { name: "Sinif əlavə et", path: "add-class", icon: <FaPlusCircle className="me-2" /> },
    { name: "Kitablar", path: "books", icon: <FaBook className="me-2" /> },
    { name: "Kitab əlavə et", path: "add-book", icon: <FaPlusCircle className="me-2" /> },
  ];

  const handleLogoutClick = () => {
    Swal.fire({
      title: "Əminsiniz?",
      text: "Hesabdan çıxmaq istədiyinizə əminsiniz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Bəli, çıx!",
      cancelButtonText: "İmtina",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/admin");
      }
    });
  };


  return (
    <div className="d-flex">
      <div
        className="bg-light d-flex flex-column p-4 shadow-sm"
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
        {/* Scroll olan menyu hissəsi */}
        <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 80px)" }}>
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
                  style={{ transition: "0.3s ease-in-out", cursor: "pointer", fontSize: "15px" }}
                >
                  {item.icon} <span className="fw-semibold">{item.name}</span>
                </ListGroup.Item>
              </Link>
            ))}
          </ListGroup>
        </div>

        {/* Sabit çıxış düyməsi */}
        <div className="mt-4">
          <ListGroup>
            <ListGroup.Item
              action
              onClick={handleLogoutClick}
              className="d-flex align-items-center rounded py-2 px-3 border-0 bg-light text-danger"
              style={{ cursor: "pointer", transition: "0.3s ease-in-out" }}
            >
              <FaSignOutAlt className="me-2" /> <span className="fw-semibold">Çıxış</span>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>

      {/* Sağ tərəf kontent sahəsi */}
      <div style={{ marginLeft: "260px", height: "100vh" }}>
        <div style={{ minHeight: "100vh" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
