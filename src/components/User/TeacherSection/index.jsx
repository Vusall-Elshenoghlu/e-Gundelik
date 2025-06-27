import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from "./TeacherSection.module.css";
import { FaArrowRight } from 'react-icons/fa';
import teacherSection from '../../../assets/images/TeacherSection.png';

function TeacherSection() {
  return (
    <Container style={{ minHeight: "80vh", marginTop: "100px" }}>
      <Row className="align-items-center mb-4 flex-column flex-md-row">
        <Col xs={12} md={8}>
          <h1 className={styles.title}>Muellimler üçün giriş</h1>
        </Col>
        <Col xs={12} md={4} className="d-flex justify-content-md-end justify-content-start mt-3 mt-md-0">
          <button className={styles.continueBtn}>
            Davam et <FaArrowRight />
          </button>
        </Col>
      </Row>

      <Row className="flex-column flex-md-row">
        <Col xs={12} md={4} className="mb-4 mb-md-0">
          <div className={`${styles.resultsAndStudents} d-flex gap-3 flex-wrap`}>
            <div className={styles.countDiv}>
              <h6 className={styles.count}>1</h6>
            </div>
            <div className="d-flex flex-column">
              <h6 className={styles.cardTitle}>Qiymetlere bax</h6>
              <p className={styles.cardText}>Tədris etdiyi siniflər üzrə həftəlik dərs cədvəli.</p>
            </div>
          </div>
          <div className={`${styles.resultsAndStudents} d-flex gap-3 mt-5 flex-wrap`}>
            <div className={styles.countDiv}>
              <h6 className={styles.count}>2</h6>
            </div>
            <div className="d-flex flex-column">
              <h6 className={styles.cardTitle}>Şagirdlər.</h6>
              <p className={styles.cardText}>Tədris apardığı siniflərin siyahısı.</p>
            </div>
          </div>
        </Col>

        <Col xs={12} md={4} className="d-flex justify-content-center my-4 my-md-0">
          <img
            src={teacherSection}
            className={styles.teacherImage}
            alt="Teacher Panel"
          />
        </Col>

        <Col xs={12} md={4}>
          <div className={`${styles.resultsAndStudents} d-flex gap-3 flex-wrap`}>
            <div className={styles.countDiv}>
              <h6 className={styles.count}>3</h6>
            </div>
            <div className="d-flex flex-column">
              <h6 className={styles.cardTitle}>Dərs cədvəli.</h6>
              <p className={styles.cardText}>Müəllimin tədris etdiyi fənn, həftəlik dərs yükü, şəxsi məlumatları.</p>
            </div>
          </div>
          <div className={`${styles.resultsAndStudents} d-flex gap-3 mt-5 flex-wrap`}>
            <div className={styles.countDiv}>
              <h6 className={styles.count}>4</h6>
            </div>
            <div className="d-flex flex-column">
              <h6 className={styles.cardTitle}>Jurnallar.</h6>
              <p className={styles.cardText}>Tədris apardığı siniflərin siyahısı.</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default TeacherSection;
