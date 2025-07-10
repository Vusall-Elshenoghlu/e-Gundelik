import React from 'react';
import styles from './TeacherDashboard.module.css';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function TeacherDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Dashboard',
      desc: 'Əsas idarəetmə paneli',
      path: 'teacher-panel',
      image: 'https://cdn-icons-png.flaticon.com/512/711/711769.png',
    },
    {
      title: 'Dərslərim',
      desc: 'Tədris etdiyiniz dərsləri izləyin və idarə edin',
      path: 'teacher-panel/my-lessons',
      image: 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png',
    },
    {
      title: 'Dərs əlavə et',
      desc: 'Yeni dərs əlavə edin',
      path: 'teacher-panel/add-lesson',
      image: 'https://cdn-icons-png.flaticon.com/512/1828/1828919.png',
    },
    {
      title: 'Şagirdlər',
      desc: 'Sizə aid olan şagirdlərin siyahısı',
      path: 'teacher-panel/students',
      image: 'https://cdn-icons-png.flaticon.com/512/201/201818.png',
    },
    {
      title: 'Profilə düzəliş et',
      desc: 'Profil məlumatlarınızı yeniləyin',
      path: 'teacher-panel/edit-profile',
      image: 'https://cdn-icons-png.flaticon.com/512/747/747545.png',
    },
    {
      title: 'Quiz yarat',
      desc: 'Yeni testlər yaradın və paylaşın',
      path: 'teacher-panel/create-quiz',
      image: 'https://cdn-icons-png.flaticon.com/512/1006/1006555.png',
    },
    {
      title: 'Quizlər',
      desc: 'Hazır testləri və vaxtlarını idarə edin',
      path: 'teacher-panel/quiz-times',
      image: 'https://cdn-icons-png.flaticon.com/512/2910/2910768.png',
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
            <Col key={index} xs={12} md={6} xl={4}>
              <div className={styles.card}>
                <div className={styles.baseText}>
                  <h2>{card.title}</h2>
                  <p>{card.desc}</p>
                  <button
                    className={styles.continueBtn}
                    onClick={() => navigate(`/${card.path}`)}
                  >
                    Davam et <FaArrowRight />
                  </button>
                </div>
                <div className={styles.baseImage}>
                  <img src={card.image} alt={card.title} style={{ maxWidth: '100px', objectFit: 'contain' }} />
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
