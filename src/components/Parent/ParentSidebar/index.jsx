import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from "./Parentsidebar.module.css"
import { FaAccessibleIcon, FaAdjust, FaBars, FaBook, FaChalkboardTeacher, FaEllipsisH, FaHome, FaLess, FaNotesMedical, FaQuestionCircle, FaRegBellSlash, FaSignOutAlt, FaSubscript, FaTimes, FaUser, FaYoutube } from 'react-icons/fa'
import { AuthContext } from '../../../context/AuthContext'
import Swal from 'sweetalert2'
function ParentSidebar() {
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
                            <h4 className='text-white text-center mb-4'>Valideyn Səhifəsi</h4>
                            <ul className='ps-0 ms-0'>
                                <li className='nav-item list-unstyled'>
                                    <Link to={""} onClick={handleLinkClick} className={`nav-link text-white ${styles.navLink}`}>
                                        <FaHome className='me-2' /> Ana səhifə
                                    </Link>
                                </li>
                                <li className='nav-item list-unstyled'>
                                    <Link to={"lessons"} onClick={handleLinkClick} className={`nav-link text-white ${styles.navLink}`}>
                                        <FaBook className='me-2' /> Dərslər
                                    </Link>
                                </li>
                                <li className='nav-item list-unstyled'>
                                    <Link to={"diary"} onClick={handleLinkClick} className={`nav-link text-white ${styles.navLink}`}>
                                        <FaChalkboardTeacher className='me-2' /> Gündəlik
                                    </Link>
                                </li>
                               
                                <li className='nav-item list-unstyled'>
                                    <Link to={"books"} onClick={handleLinkClick} className={`nav-link text-white ${styles.navLink}`}>
                                        <FaBook className='me-2' /> Kitablar
                                    </Link>
                                </li>
                                <li className='nav-item list-unstyled'>
                                    <Link to={"subjects"} onClick={handleLinkClick} className={`nav-link text-white ${styles.navLink}`}>
                                        <FaAdjust className='me-2' /> Fənnlər
                                    </Link>
                                </li>
                                <li className='nav-item list-unstyled'>
                                    <Link to={"quiz-times"} onClick={handleLinkClick} className={`nav-link text-white ${styles.navLink}`}>
                                        <FaQuestionCircle className='me-2' /> Imtahan vaxtlari
                                    </Link>
                                </li>
                                <li className='nav-item list-unstyled'>
                                    <Link to={"https://www.youtube.com/"} target='_blank' onClick={handleLinkClick} className={`nav-link text-white ${styles.navLink}`}>
                                        <FaYoutube className='me-2' /> Canlı izlə
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <div onClick={handleLogoutClick} className={`nav-link text-white ${styles.navLink}`} style={{cursor:"pointer"}}>
                                <FaSignOutAlt className='me-2' /> Logout
                            </div>
                            <div className={`text-white mt-2 ${styles.userName}`}>
                                <div><FaUser /></div>
                                <h5>{user?.name}</h5>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default ParentSidebar;
