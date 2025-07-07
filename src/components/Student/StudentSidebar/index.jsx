import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom' // düzəliş etdin
import { motion, AnimatePresence } from 'framer-motion'
import styles from "./StudentSidebar.module.css"
import { FaBars, FaBook, FaCheck, FaHome, FaSignOutAlt, FaTimes, FaUser } from 'react-icons/fa'
import { AuthContext } from '../../../context/AuthContext'
import Swal from 'sweetalert2'

function StudentSidebar() {
    const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
    const {user, logout} = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        const handleResize = () => {
            setIsOpen(window.innerWidth > 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLinkClick = () => {
        if (window.innerWidth <= 768) {
            setIsOpen(false);
        }
    };
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
        navigate("/login");
      }
    });
  };

    return (
        <>
            <button className={`btn btn-light ${styles.menuBtn}`} onClick={() => setIsOpen(!isOpen)}>
                {isOpen && window.innerWidth <= 768 ? <FaTimes /> : <FaBars />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={`${styles.sidebar} d-flex flex-column justify-content-between p-3`}
                        initial={{ x: 300 }}
                        animate={{ x: 0 }}
                        exit={{ x: 300 }}
                        transition={{ type: 'spring', stiffness: 80 }}
                    >
                        <div>
                            <h4 className='text-white text-center mb-4'>Student Sidebar</h4>
                            <ul className='ps-0 ms-0'>
                                <li className='nav-item list-unstyled'>
                                    <Link to={""} onClick={handleLinkClick} className={`nav-link text-white ${styles.navLink}`}>
                                        <FaHome className='me-2' /> Menu
                                    </Link>
                                </li>
                                <li className='nav-item list-unstyled'>
                                    <Link to={"lessons"} onClick={handleLinkClick} className={`nav-link text-white ${styles.navLink}`}>
                                        <FaHome className='me-2' /> Lessons
                                    </Link>
                                </li>
                                <li className='nav-item list-unstyled'>
                                    <Link to={"diary"} onClick={handleLinkClick} className={`nav-link text-white ${styles.navLink}`}>
                                        <FaBook className='me-2' /> Diary
                                    </Link>
                                </li>
                                <li className='nav-item list-unstyled'>
                                    <Link to={"results"} onClick={handleLinkClick} className={`nav-link text-white ${styles.navLink}`}>
                                        <FaHome className='me-2' /> Results
                                    </Link>
                                </li>
                                <li className='nav-item list-unstyled'>
                                    <Link to={"check-yourself"} onClick={handleLinkClick} className={`nav-link text-white ${styles.navLink}`}>
                                        <FaCheck className='me-2' /> Ozunu Yoxla
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <div onClick={handleLogoutClick} className={`nav-link text-white ${styles.navLink}`} style={{cursor:"pointer"}}>
                                <FaSignOutAlt className='me-2' /> Logout
                            </div>
                            <div className={`text-white mt-2 ${styles.userName}`}>
                                <div><FaUser/></div>
                                <h5>{user.name}</h5>
                            </div>
                        </div>
                    </motion.div>

                )}
            </AnimatePresence>
        </>
    );
}

export default StudentSidebar