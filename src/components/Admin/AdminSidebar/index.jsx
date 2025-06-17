import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserGraduate, FaChalkboardTeacher, FaUserFriends, FaUsers, FaHome, FaCog } from 'react-icons/fa';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './AdminSidebar.module.css'; // module.css düz import

const AdminSidebar = () => {
  return (
    <motion.div 
      className={`${styles.sidebar} d-flex flex-column p-3`}
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
    >
      <h4 className="text-white text-center mb-4">EduAdmin Panel</h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/dashboard" className={`nav-link text-white ${styles.navLink}`}>
            <FaHome className="me-2" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/students" className={`nav-link text-white ${styles.navLink}`}>
            <FaUserGraduate className="me-2" /> Students
          </Link>
        </li>
        <li>
          <Link to="/teachers" className={`nav-link text-white ${styles.navLink}`}>
            <FaChalkboardTeacher className="me-2" /> Teachers
          </Link>
        </li>
        <li>
          <Link to="/parents" className={`nav-link text-white ${styles.navLink}`}>
            <FaUserFriends className="me-2" /> Parents
          </Link>
        </li>
        <li>
          <Link to="/members" className={`nav-link text-white ${styles.navLink}`}>
            <FaUsers className="me-2" /> Members
          </Link>
        </li>
        <li>
          <Link to="/settings" className={`nav-link text-white ${styles.navLink}`}>
            <FaCog className="me-2" /> Settings
          </Link>
        </li>
      </ul>
    </motion.div>
  );
};

export default AdminSidebar;
