import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import {jwtDecode} from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginSchema = Yup.object().shape({
  emailOrUserName: Yup.string().required('Email or Username is required'),
  password: Yup.string().min(4, 'Too Short!').max(20, 'Too Long!').required('Password is required'),
});

const AdminLogin = ({ setUser, setAccessToken, setRefreshToken }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://turanapi2-001-site1.jtempurl.com/api/Auth/login", {
        emailOrUserName: values.emailOrUserName,
        password: values.password,
        rememberMe: values.rememberMe,
      });

      const token = response.data.accessToken;
      const decodeToken = jwtDecode(token);

      const userData = {
        userId: decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        name: decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        role: decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      };

      if (userData.role !== "Admin") {
        toast.error("Only admin can log in here.");
        setSubmitting(false);
        return;
      }

      setUser && setUser(userData.name);
      setAccessToken && setAccessToken(token);
      setRefreshToken && setRefreshToken(response.data.refreshToken);

      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(userData));

      if (values.rememberMe) {
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }

      toast.success("Uğurlu giriş");
      navigate("/admin-panel");
      window.location.reload()

    } catch (err) {
      const errorData = err.response?.data;

      if (errorData?.errors) {
        Object.values(errorData.errors).forEach(errorArr => {
          errorArr.forEach(msg => toast.error(msg));
        });
      } else if (errorData?.title) {
        toast.error(errorData.title);
      } else if (errorData?.message) {
        toast.error(errorData.message);
      } else {
        toast.error("Unknown error occurred");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Helmet><title>Admin Login</title></Helmet>
      <div className="card shadow-lg" style={{ width: '25rem' }}>
        <div className="card-body p-4">
          <h1 className="text-center mb-4">Admin Login</h1>
          <Formik
            initialValues={{ emailOrUserName: '', password: '', rememberMe: false }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="mb-3">
                  <label className="form-label">Email or Username</label>
                  <Field
                    name="emailOrUserName"
                    className={`form-control ${errors.emailOrUserName && touched.emailOrUserName ? 'is-invalid' : ''}`}
                  />
                  {errors.emailOrUserName && touched.emailOrUserName && (
                    <div className="invalid-feedback">{errors.emailOrUserName}</div>
                  )}
                </div>

                <div className="mb-3 position-relative">
                  <label className="form-label">Password</label>
                  <Field
                    name="password"
                    type={passwordVisible ? 'text' : 'password'}
                    className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                  />
                  <div
                    className="position-absolute"
                    style={{ right: '10px', top: '35px', cursor: 'pointer' }}
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </div>
                  {errors.password && touched.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <div className="mb-3 form-check">
                  <Field name="rememberMe" type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
