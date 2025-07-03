import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from "./TeacherSidebar.module.css"
import { FaBars, FaBook, FaChalkboardTeacher, FaHome, FaSignOutAlt, FaTimes, FaUser } from 'react-icons/fa'
import { AuthContext } from '../../../context/AuthContext'

function TeacherSidebar() {
    const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
    const {user} = useContext(AuthContext)

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
                            <h4 className='text-white text-center mb-4'>Teacher Sidebar</h4>
                            <ul className='ps-0 ms-0'>
                                <li className='nav-item list-unstyled'>
                                    <Link to={""} onClick={handleLinkClick} className={`nav-link text-white ${styles.navLink}`}>
                                        <FaHome className='me-2' /> Dashboard
                                    </Link>
                                </li>
                                <li className='nav-item list-unstyled'>
                                    <Link to={"my-lessons"} onClick={handleLinkClick} className={`nav-link text-white ${styles.navLink}`}>
                                        <FaChalkboardTeacher className='me-2' /> My Lessons
                                    </Link>
                                </li>
                                <li className='nav-item list-unstyled'>
                                    <Link to={"add-lesson"} onClick={handleLinkClick} className={`nav-link text-white ${styles.navLink}`}>
                                        <FaChalkboardTeacher className='me-2' /> Add Lesson
                                    </Link>
                                </li>
                                <li className='nav-item list-unstyled'>
                                    <Link to={"students"} onClick={handleLinkClick} className={`nav-link text-white ${styles.navLink}`}>
                                        <FaBook className='me-2' /> Students
                                    </Link>
                                </li>
                                
                            </ul>
                        </div>

                        <div>
                            <Link to={"logout"} onClick={handleLinkClick} className={`nav-link text-white ${styles.navLink}`}>
                                <FaSignOutAlt className='me-2' /> Logout
                            </Link>
                            <div className={`text-white mt-2 ${styles.userName}`}>
                                <div><FaUser /></div>
                                <h5>Mr. {user.name}</h5>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default TeacherSidebar;
