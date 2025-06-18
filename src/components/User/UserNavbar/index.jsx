import React, { useEffect, useRef, useState } from "react";
import { Navbar, Nav, Button, Carousel } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import styles from "./UserNavbar.module.css";
import parentImage from '../../../assets/images/parent.jpg';
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router";


const users = [
  {
    role: "Şagird",
    img: "https://www.smarttech.com/-/media/project/smart/www/resources/blogs/hero-and-opengraph/article-addressing-the-student-mental-health-crisis.jpeg?h=4480&iar=0&w=6720&rev=8d8c698221ab42a39fdab60ef02835d4&hash=84510F6BA435076CC38FCAA363745D5B",
    route:"/student-login"
  },
  {
    role: "Valideyn",
    img: parentImage,
    route:"/parent-login"
  },
  {
    role: "Müəllim",
    img: "https://www.venkateshwaragroup.in/vgiblog/wp-content/uploads/2022/09/Untitled-design-2-1-1200x1200.jpg",
    route:"/teacher-login"
  },
  {
    role: "Direktor",
    img: "https://media.istockphoto.com/id/595158506/photo/portrait-of-solid-middle-aged-businessman.jpg?s=612x612&w=0&k=20&c=SIH-PNrQQL5WknmXcl17LLUiMBc3AwuaX5j0gTefyso=",
    route:"director-login"
  },
];

const UserNavbar = () => {
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handlers = useSwipeable({
    onSwipedLeft: () => carouselRef.current?.next?.(),
    onSwipedRight: () => carouselRef.current?.prev?.(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.navbarHeroWrapper}>
      <motion.nav
        className={styles.navbar}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.navbarContent}>
          <a href="/" className={styles.brand}>rəqəmsal məktəb</a>

          <div className={styles.linksDesktop}>
            <a href="#about">Layihə haqqında</a>
            <a href="#videos">Tədris videoları</a>
            <a href="#schools">Bakı məktəbləri</a>
            <a href="#faq">FAQ</a>
            <a href="#guide">İstifadəçi təlimatı</a>
          </div>

          <button className={styles.loginBtn}>Giriş</button>

          <div className={styles.menuIcon} onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <a href="#about" onClick={toggleMenu}>Layihə haqqında</a>
              <a href="#videos" onClick={toggleMenu}>Tədris videoları</a>
              <a href="#schools" onClick={toggleMenu}>Bakı məktəbləri</a>
              <a href="#faq" onClick={toggleMenu}>FAQ</a>
              <a href="#guide" onClick={toggleMenu}>İstifadəçi təlimatı</a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className={styles.heroSection}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.heroTitle}
        >
          Rəqəmsal Məktəb platforması
        </motion.h1>
        <p className={styles.heroSubtitle}>
          Rəqəmsal mühitdə öyrənmə, tədris, ünsiyyət və əməkdaşlıq platformasıdır.
        </p>

        {isMobile ? (
          <Carousel ref={carouselRef} interval={3000} className={styles.heroCarousel} indicators = {false} controls = {false}>
            {users.map((user, index) => (
              <Carousel.Item key={index}>
                <motion.div
                  {...handlers}
                  className={styles.carouselItemCustom}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img src={user.img} alt={user.role} className={styles.userImg} />
                  <button className={styles.roleBtn}>{user.role}</button>
                </motion.div>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <div className={styles.gridWrapper}>
            {users.map((user, index) => (
              <motion.div
                key={index}
                className={`${styles.gridItem} ${index === 1 || index === 2 ? styles.lowered : styles.raised}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img src={user.img} alt={user.role} className={styles.userImg} />
                <Link to={user.route} style={{textDecoration:"none"}} className={styles.roleBtn}>{user.role}</Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNavbar;
