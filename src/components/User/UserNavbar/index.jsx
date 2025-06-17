import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Swal from "sweetalert2";
import "./UserNavbar.module.css";
import { toast } from "react-toastify";
import { darkModeContext } from "../../../context/DarkModeContext";
import { AuthContext } from "../../../context/AuthContext";

const UserNavbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(darkModeContext  );
  const [token,setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "")
  const navigate = useNavigate();
  const location = useLocation(); 

  const [opacity,setOpacity] = useState(1)

  useEffect(() =>{
    const handleScroll = () =>{
      const scrollY = window.scrollY;
      setOpacity(scrollY > 110 ? 0.3 : 1)
    }

    window.addEventListener("scroll",handleScroll);
    return () => window.removeEventListener("scroll",handleScroll)
  },[])

  function handleReservation(){
    if(token){
      toast.warn(content[lang].navDoctor)
      navigate("/doctors")
    }else{
        toast.warn(content[lang].logAppoint)
        navigate("/login")
    }
  }

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
        setUser(!user);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        sessionStorage.removeItem("userEmail")
        setUser(null);
        Swal.fire({
          title: "Logged Out!",
          text: "Logged Out Successfully..",
          icon: "success",
        });
      }
    });
  };

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <Navbar expand="lg" className={`bg-${darkMode ? "dark text-light" : "light"} shadow-sm`} sticky="top" style={{opacity, transition:"opacity 0.3s ease-in-out" }}>
      <Navbar.Brand>
        <Link to="/">
          <img src="/images/navbarLogoDarkMode.png" alt="" className="logo-img" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/" className={isActive("/")}>
            Ev
          </Nav.Link>
          <Nav.Link as={Link} to="/about" className={isActive("/about")}>
            Haqqimizda
          </Nav.Link>
          <Nav.Link as={Link} to="/contact" className={isActive("/contact")}>
            Elaqe
          </Nav.Link>
          <Nav.Link as={Link} to="/video-call-lobby" className={isActive("/video-call-lobby")}>
              Video-Call
          </Nav.Link>

        </Nav>

        <Dropdown style={{ marginRight: "20px" }}>
          
          
        </Dropdown>

        {user ? (
          <Dropdown className="me-3">
            <Dropdown.Toggle variant="outline-secondary" id="user-dropdown">
              👤 {user.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/my-profile" style={{color:`${darkMode ? "blue" : ""}`}}>
               profil
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout} className="text-danger" style={{color:`${darkMode ? "blue" : ""}`}}>
                Cixis
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <div className="me-3 d-flex">
            <Link to="/login" className="btn btn-primary me-2">
              Daxil ol
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Qeydiyyat
            </Link>
          </div>
        )}

        <Button variant="outline-dark" onClick={() => setDarkMode(!darkMode)} className="me-3">
          {darkMode ? "☀" : "🌙"}
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default UserNavbar;
