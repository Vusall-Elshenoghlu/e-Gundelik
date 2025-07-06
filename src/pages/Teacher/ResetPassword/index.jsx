import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './ResetPassword.module.css';
import { toast } from 'react-toastify';

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [message, setMessage] = useState("");
    const validationSchema = Yup.object({
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
    });



    const email = searchParams.get("email");
    const rawToken = searchParams.get("token")
    const token = decodeURIComponent(rawToken)

    console.log("Email:", email);
    console.log("Token:", token);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const res = await axios.post("https://turansalimli-001-site1.ntempurl.com/api/Auth/reset-password", {
                email,
                token,
                newPassword: values.password,
                confirmPassword: values.confirmPassword,
            });

            console.log("Response:", res);

            if (res.status === 200) {
                setMessage("✅ Password successfully changed!");
                setTimeout(() => {
                    navigate("/login");
                }, 2000); 
            } else {
                setMessage(res.data.message || "❌ Something went wrong.");
            }
        } catch (error) {
            console.error("Error Response:", error.response?.data || error.message);
            toast.error( error.response?.data || error.message)
            setMessage(error.response?.data?.message || "❌ An error occurred while resetting password.");
        }
        setSubmitting(false);
    };


    return (
        <div className={styles.resetPasswordWrapper}>
            <Helmet>
                <title>Reset Password</title>
            </Helmet>

            <motion.div
                className={styles.authContainer}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <h2 className={styles.formTitle}>🔐 Reset Password</h2>

                <Formik
                    initialValues={{ password: '', confirmPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className={styles.authForm}>
                            <div className={styles.inputWrapper}>
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter new password"
                                    className={styles.inputField}
                                />
                                <div className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                                <ErrorMessage name="password" component="div" className={styles.errorMessage} />
                            </div>

                            <div className={styles.inputWrapper}>
                                <Field
                                    type={showConfirm ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    className={styles.inputField}
                                />
                                <div className={styles.eyeIcon} onClick={() => setShowConfirm(!showConfirm)}>
                                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                                </div>
                                <ErrorMessage name="confirmPassword" component="div" className={styles.errorMessage} />
                            </div>

                            {message && <motion.div className={styles.message} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{message}</motion.div>}

                            <motion.button
                                type="submit"
                                className={styles.submitBtn}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Reset Password"}
                            </motion.button>
                        </Form>
                    )}
                </Formik>
            </motion.div>
        </div>
    );
}

export default ResetPassword;
