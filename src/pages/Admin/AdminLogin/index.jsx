import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(4, 'Too Short!').max(20, 'Too Long!').required('Required'),
});

const AdminLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Helmet>
        <title>
          Admin-Login
        </title>
      </Helmet>
      <div className="card shadow-lg" style={{ width: '25rem' }}>
        <div className="card-body p-4">
          <h1 className="text-center mb-4">Admin Login</h1>

          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                const response = await axios.post('http://localhost:3000/admin/login', values);

                if (response.data.success) {
                  localStorage.setItem('adminToken', response.data.token);
                  toast.success('Login successful!');
                  navigate('/dashboard');
                } else {
                  toast.error(response.data.message || 'Invalid credentials');
                }
              } catch (error) {
                console.error('Error during login:', error);

                if (error.response) {
                  toast.error(error.response.data.message || 'An error occurred during login');
                } else {
                  toast.error('An error occurred during login');
                }
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                  />
                  {errors.email && touched.email ? (
                    <div className="invalid-feedback">{errors.email}</div>
                  ) : null}
                </div>

                <div className="mb-3 position-relative">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Field
                    id="password"
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
                  {errors.password && touched.password ? (
                    <div className="invalid-feedback">{errors.password}</div>
                  ) : null}
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </button>
                  <div style={{ display: "flex", gap: "20px" }}>
                    Doctor Login? <a href="/doctor">Doctor</a>
                  </div>
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
