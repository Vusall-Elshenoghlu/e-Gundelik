import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router';
import Swal from "sweetalert2"
import "./AdminNavbar.module.css"
function AdminNavbar() {
    const navigate = useNavigate();

    function handleLogout() {
        Swal.fire({
            title: "Çıxmaq istədiyinizə əminsiniz?",
            text: "Bu əməliyyatı geri qaytara bilməyəcəksiniz!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4e73df", 
            cancelButtonColor: "#e74a3b", 
            confirmButtonText: "Bəli, Çıxmaq istəyirəm!",
            cancelButtonText: "İmtina et",
            background: "#f0f8ff", 
            customClass: {
                title: 'swal-title',
                content: 'swal-content',
                confirmButton: 'swal-confirm-btn',
                cancelButton: 'swal-cancel-btn',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("adminToken");
                navigate("/");
                Swal.fire({
                    title: "Çıxış edilib!",
                    text: "Sistemdən uğurla çıxış etdiniz.",
                    icon: "success",
                    confirmButtonColor: "#4e73df",
                    background: "#f0f8ff", 
                });
            }
        });
        
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary" style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            zIndex: "1000",
            height: "80px" 
        }}>
            <Navbar.Brand style={{ marginRight: "100px" }}>
                <img className='logo-containerr' src="/images/logoo.jpg" alt="" />
            </Navbar.Brand>
            
            <Button 
                variant="outline-primary" 
                style={{ 
                    marginLeft: "auto", 
                    marginRight: "20px", 
                    backgroundColor: "#007bff", 
                    color: "white", 
                    border: "2px solid #007bff",
                    fontWeight: "600",
                    fontSize: "16px",
                    borderRadius: "25px",
                    padding: "10px 20px",
                    transition: "background-color 0.3s, transform 0.2s"
                }}
                onClick={() => navigate("/doctor-panel")}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#007bff"}
            >
                Admin Panel
            </Button>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Button variant='danger' style={{ marginRight: "200px" }} onClick={() => handleLogout()}>Logout</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default AdminNavbar;
