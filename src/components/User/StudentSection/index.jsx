import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./StudentSection.module.css";
import { FaArrowRight } from "react-icons/fa";
import studentSection from '../../../assets/images/studentSection.jpg';


const StudentSection = () => {
  return (
    <Container className="my-5">
      <Row className="align-items-center mb-4">
        <Col xs={12} md={8}>
          <h1 className={styles.title}>Şagirdlər üçün giriş</h1>
        </Col>
        <Col xs={12} md={4} className="d-flex justify-content-md-end justify-content-start">
          <button className={styles.continueBtn}>
            Davam et <FaArrowRight />
          </button>
        </Col>
      </Row>

      <Row className="g-3">
        <Col xs={12} md={9}>
          <Row className="g-3">
            <Col xs={12} md={9}>
              <div className={`${styles.card} ${styles.purple}`}>
                <h5>Məktəbdə keçirilən dərsləri onlayn mükəmməlləşdir.</h5>
                <p>
                  Hazırlanmış tapşırıqları və kvizləri yerinə yetirərək keçilmiş
                  mövzuları möhkəmləndirə bilərsiniz.
                </p>
              </div>
            </Col>
            <Col xs={12} md={3}>
              <div className={`${styles.card} ${styles.green}`}>
                <h5>Müəllimlərdən soruş.</h5>
                <p>Mövzu ilə bağlı müəllimlərə sual verə bilərsiniz.</p>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className={`${styles.card} ${styles.darkPurple}`}>
                <h5>Video dərslər və elektron dərsliklər.</h5>
                <p>Mövzuların video izahını izləyə bilərsiniz.</p>
              </div>
            </Col>
            <Col xs={12} md={8}>
              <div className={`${styles.card} ${styles.pink}`}>
                <h5>Özünü qiymətləndirmə.</h5>
                <p>Dərsi tam anladığını yoxlaya bilərsiniz.</p>
              </div>
            </Col>
          </Row>
        </Col>

        <Col xs={12} md={3}>
          <div className={styles.imageCard}>
            <img
              src={studentSection}
              alt="boy with lupa"
              className={styles.image}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentSection;
