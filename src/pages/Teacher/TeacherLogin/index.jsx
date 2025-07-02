import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './TeacherLogin.module.css';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { darkModeContext } from '../../../context/DarkModeContext';
import loginImage from '../../../assets/images/educationLogin.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../../../context/AuthContext';

const TeacherLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailOrUserName, setEmailOrUserName] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useContext(darkModeContext);
  const { setUser, refreshToken, setRefreshToken, setAccessToken } = useContext(AuthContext)


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      emailOrUserName,
      password,
      rememberMe
    });

    try {
      const response = await axios.post("https://turansalimli-001-site1.ntempurl.com/api/Auth/login", {
        emailOrUserName,
        password,
        rememberMe
      });
      console.log(response.data)

      const token = response.data.accessToken



      const decodeToken = jwtDecode(token);
      console.log(decodeToken)
      const userData = {
        userId: decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        name: decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        role: decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      };
      setUser(userData.name)
      console.log(userData.name)
      setAccessToken(token)
      setRefreshToken(response.data.refreshToken)
      console.log(refreshToken)
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log(token)

      if (rememberMe) {
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }

      toast.success("Login successful!");
      if (userData.role === "Admin") {
        navigate("/admin-dashboard");
      } else if (userData.role === "Teacher") {
        navigate("/teacher-panel");
      } else if (userData.role === "Parent") {
        navigate("/parent-portal");
      } else if (userData.role === "Student") {
        navigate("/student-page");
      } else {
        navigate("/");
      }


    } catch (err) {
      const errorData = err.response?.data;

      if (errorData?.errors && typeof errorData.errors === "object") {
        Object.values(errorData.errors).forEach((errorArr) => {
          if (Array.isArray(errorArr)) {
            errorArr.forEach((msg) => toast.error(msg));
          }
        });
        return;
      }

      if (errorData?.title) {
        toast.error(errorData.title);
        return;
      } else if (errorData?.Message) {
        toast.error(errorData.Message);
        return;
      }

      toast.error("Unknown error occurred");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      className={`${styles.wrapper} ${darkMode ? styles.darkWrapper : styles.lightWrapper}`}
    >
      <div className={`${styles.leftSide} ${darkMode ? styles.darkLeft : styles.lightLeft}`}>
        <motion.img
          src={loginImage}
          alt="Login"
          className={styles.image}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      <div className={`${styles.rightSide} ${darkMode ? styles.darkRight : styles.lightRight}`}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Welcome Back</h2>

          <input
            type="text"
            placeholder="Email or Username"
            // required
            className={styles.loginInput}
            value={emailOrUserName}
            onChange={(e) => setEmailOrUserName(e.target.value)}
          />

          <div className={styles.passwordWrapper}>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              // required
              className={styles.loginInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className={styles.eyeIcon}
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>



          <div className={styles.rememberMeWrapper}>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          <button type="submit" className={styles.loginButton}>
            Login
          </button>

          <p className={styles.registerRedirect}>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default TeacherLogin;
