import React from "react";
import { Link } from "react-router-dom";
import styles from "./NoPage.module.css";
import { FaGraduationCap } from "react-icons/fa";

export default function NoPage() {
  return (
    <div className={styles.hero}>
      <div className={styles.particles}></div>
      <div className={styles.centerContent}>
        <div className={styles.iconWrapper}>
          <FaGraduationCap className={styles.icon} />
        </div>
        <h1 className={styles.title}>404 </h1>
        <h2 className={styles.subtitle}>Səhifə Tapılmadı</h2>
        <p className={styles.text}>
          Axtardığınız təhsil səhifəsi mövcud deyil və ya köçürülüb.
        </p>
        <Link to="/" className={styles.button}>
          Ana Səhifəyə Qayıt
        </Link>
      </div>
    </div>
  );
}
