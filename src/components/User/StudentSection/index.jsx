import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./StudentSection.module.css";
import { FaArrowRight } from "react-icons/fa";

const StudentSection = () => {
  return (
    <Container className="my-5" style={{ display: "flex", flexDirection: "column", gap: "50px", backgroundColor:"aqua" }}>
      <Row className="align-items-center mb-5">
        <Col md={8} sm={12}>
          <h1 style={{ fontWeight: "600", fontSize: "40px", fontFamily: "sans-serif" }}>
            Şagirdlər üçün giriş
          </h1>
        </Col>
        <Col md={4} sm={12}>
          <button className={styles.continueBtn}>
            Davam et <FaArrowRight />
          </button>
        </Col>
      </Row>
      <Row style={{backgroundColor:"red"}}>
        <Col md={9} sm={12}>
          <Row>
            <Col md={9} sm={12} className="mb-3">
              <div className={`${styles.card} ${styles.purple}`}>
                <h5>Məktəbdə keçirilən dərsləri onlayn mükəmməlləşdir.</h5>
                <p>Hazırlanmış tapşırıqları və kvizləri yerinə yetirərək keçilmiş mövzuları möhkəmləndirə bilərsiniz.</p>
              </div>
            </Col>
            <Col md={3} sm={12} className="mb-3">
              <div className={`${styles.card} ${styles.green}`}>
                <h5>Müəllimlərdən soruş.</h5>
                <p>Mövzu ilə bağlı müəllimlərə sual verə bilərsiniz.</p>
              </div>
            </Col>

            <Col md={4} sm={12} className="mb-3">
              <div className={`${styles.card} ${styles.darkPurple}`}>
                <h5>Video dərslər və elektron dərsliklər.</h5>
                <p>Mövzuların video izahını izləyə bilərsiniz.</p>
              </div>
            </Col>
            <Col md={8} sm={12} className="mb-3">
              <div className={`${styles.card} ${styles.pink}`}>
                <h5>Özünü qiymətləndirmə.</h5>
                <p>Dərsi tam anladığını yoxlaya bilərsiniz.</p>
              </div>
            </Col>
          </Row>
        </Col>

        <Col md={3} sm={12}>
          <div className={styles.imageCard}>
            <img
              src="https://img.freepik.com/free-photo/smiley-girl-using-laptop_23-2148882725.jpg"
              alt="Girl with laptop"
              className={styles.image}
            />
          </div>
        </Col>
      </Row>

    </Container>
  );
};

export default StudentSection;
