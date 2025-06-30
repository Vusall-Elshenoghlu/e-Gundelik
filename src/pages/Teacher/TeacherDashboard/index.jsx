import React from 'react';
import styles from './TeacherDashboard.module.css';
import { FaArrowRight } from 'react-icons/fa';
import lessonImage from '../../../assets/images/lessons.png';
import { motion } from 'framer-motion';
import { Col, Container, Row } from 'react-bootstrap';

function TeacherDashboard() {
  const cards = [
    {
      title: 'Dərs cədvəli',
      desc: 'Həftəlik dərs cədvəli',
    },
    {
      title: 'Qiymətləndirmə',
      desc: 'Tədris apardığınız siniflərin təlim nəticələri',
    },
    {
      title: 'Şagird siyahısı',
      desc: 'Tədris apardığınız siniflərin siyahısı',
    },
    {
      title: 'Elanlar',
      desc: 'Tədris ilinə dair təlimat və məlumatlar',
    },
    {
      title: 'Elanlar',
      desc: 'Tədris ilinə dair təlimat və məlumatlar',
    },
    {
      title: 'Elanlar',
      desc: 'Tədris ilinə dair təlimat və məlumatlar',
    },
    {
      title: 'Elanlar',
      desc: 'Tədris ilinə dair təlimat və məlumatlar',
    },
    {
      title: 'Elanlar',
      desc: 'Tədris ilinə dair təlimat və məlumatlar',
    },
    {
      title: 'Elanlar',
      desc: 'Tədris ilinə dair təlimat və məlumatlar',
    },
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6 }}
      className={`${styles.dashboardWrapper}`}
    >
      <Container fluid>
        <Row className="g-4">
          {cards.map((card, index) => (
            <Col key={index} xs={12} md={6} xl={6}>
              <div className={styles.card}>
                <div className={styles.baseText}>
                  <h2>{card.title}</h2>
                  <p>{card.desc}</p>
                  <button className={styles.continueBtn}>
                    Davam et <FaArrowRight />
                  </button>
                </div>
                <div className={styles.baseImage}>
                  <img src={lessonImage} alt="lesson" />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </motion.div>
  );
}

export default TeacherDashboard;
