import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import styles from './ForgotPassword.module.css';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://turansalimli-001-site1.ntempurl.com/api/Auth/forget-password", { email });
      toast.success(res.data.message || "Check your email for reset link.");
      setEmail("");
      setMessage(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className={styles.loginn}>
      <div className={styles.authContainer}>
        <Helmet>
          <title>Forgot Password</title>
        </Helmet>
        {message && <p>{message}</p>}
        <form className={`${styles.authForm} form-box`} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Forgot Password</h2>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${styles.inputField} form-control mt-2`}
            required
          />
          <button
            type="submit"
            className={`btn btn-primary mt-3 ${styles.submitBtn}`}
          >
            Send Reset Link
          </button>
          <p className={styles.redirectText}>
            Remembered your password?{' '}
            <a href="/login" className={styles.redirectLink}>Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
