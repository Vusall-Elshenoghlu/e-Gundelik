import "bootstrap/dist/css/bootstrap.min.css"
import styles from "./UserFooter.module.css"
import { FaEnvelope, FaFacebook, FaGraduationCap, FaInstagram, FaLinkedin, FaMapMarked, FaMapMarker, FaPhone, FaTelegram } from "react-icons/fa"
const UserFooter = () => {
  return (
    <footer className={`${styles.footer} bg-dark text-light py-4`}>
      <div className="container">
        <div className="row">
          {/* Haqqımızda */}
          <div className="col-md-4 mb-3">
            <h5 className={`${styles.title} text-primary`}>
              <FaGraduationCap/>
              e-Gündəlik
            </h5>
            <p className={styles.text}>
              Keyfiyyətli təhsil vasitəsilə gələcəyinizi qurun. Minlərlə tələbə ilə birlikdə öyrənin.
            </p>
            <div className={styles.social}>
              <a href="#" className={styles.socialLink}>
                <FaFacebook/>
              </a>
              <a href="https://www.instagram.com/aliyev222__/" target="_blank" className={styles.socialLink}>
                <FaInstagram/>
              </a>
              <a href="https://www.linkedin.com/in/vilayataliyev/" target="_blank" className={styles.socialLink}>
                <FaLinkedin/>
              </a>
              <a href="#" className={styles.socialLink}>
                <FaTelegram/>
              </a>
            </div>
          </div>

          {/* Keçidlər */}
          <div className="col-md-2 mb-3">
            <h6 className={styles.subtitle}>Keçidlər</h6>
            <ul className={`${styles.list} list-unstyled`}>
              <li>
                <a href="#" className={styles.link}>
                  Ana səhifə
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Kurslar
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Haqqımızda
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Əlaqə
                </a>
              </li>
            </ul>
          </div>

          {/* Təhsil */}
          <div className="col-md-3 mb-3">
            <h6 className={styles.subtitle}>Təhsil Proqramları</h6>
            <ul className={`${styles.list} list-unstyled`}>
              <li>
                <a href="#" className={styles.link}>
                  Bakalavr
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Magistr
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Online Kurslar
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Sertifikatlar
                </a>
              </li>
            </ul>
          </div>

          {/* Əlaqə */}
          <div className="col-md-3 mb-3">
            <h6 className={styles.subtitle}>Əlaqə Məlumatları</h6>
            <div className={styles.contact}>
              <p>
                <FaMapMarker className="me-2"/>Bakı, Azərbaycan
              </p>
              <p>
                <FaPhone className="me-2"/>+994 12 123 45 67
              </p>
              <p>
                <FaEnvelope className="me-2"/>info@eduaz.edu
              </p>
            </div>
            <div className={styles.newsletter}>
              <input type="email" className="form-control form-control-sm mb-2" placeholder="Email ünvanınız" />
              <button className="btn btn-primary btn-sm">Abunə ol</button>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0">&copy; {new Date().getFullYear()} e-Gündəlik. Bütün hüquqlar qorunur.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <a href="#" className={`${styles.link} me-3`}>
              Məxfilik Siyasəti
            </a>
            <a href="#" className={styles.link}>
              İstifadə Şərtləri
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default UserFooter
