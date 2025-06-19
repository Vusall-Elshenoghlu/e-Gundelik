import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' // düzəliş etdin
import { motion, AnimatePresence } from 'framer-motion'
import styles from "./StudentSidebar.module.css"
import { FaBars, FaBook, FaHome, FaTimes } from 'react-icons/fa'


function StudentSidebar() {
    const [isOpen, setIsOpen] = useState(window.innerWidth > 768);

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
                        className={`${styles.sidebar} d-flex flex-column p-3`}
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ type: 'spring', stiffness: 80 }}
                    >
                        <h4 className='text-white text-center mb-4'>Student Sidebar</h4>
                        <ul>
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
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default StudentSidebar