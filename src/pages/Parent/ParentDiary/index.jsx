import React from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import styles from './ParentDiary.module.css';

const CalendarIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-calendar-check-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
  </svg>
);

const timetable = {
  '16.06.2025 Bazar ertəsi': ['Azərbaycan dili', 'Azərbaycan dili', 'Riyaziyyat', 'Musiqi', '', '', ''],
  '17.06.2025 Çərşənbə axşamı': ['Azərbaycan dili', 'Azərbaycan dili', 'Riyaziyyat', 'İngilis dili', 'Fiziki tərbiyə', '', ''],
  '18.06.2025 Çərşənbə': ['Azərbaycan dili', 'Azərbaycan dili', 'Riyaziyyat', 'Təsviri incəsənət', 'İnformatika', '', ''],
  '19.06.2025 Cümə axşamı': ['Azərbaycan dili', 'Azərbaycan dili', 'Riyaziyyat', 'Texnologiya', '', '', ''],
  '20.06.2025 Cümə': ['Azərbaycan dili', 'Azərbaycan dili', 'Fiziki tərbiyə', 'Musiqi', '', '', '']
};

const hours = [
  '08:00 – 08:45',
  '08:50 – 09:35',
  '09:35 – 10:20',
  '10:30 – 11:15',
  '11:20 – 12:05',
  '12:10 – 12:55',
  '13:00 – 13:45'
];

function ParentDiary() {
  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
    >
      <Container fluid className={styles.mainContent}>
        <Row className={`align-items-center mb-4 ${styles.header}`}>
          <Col xs={12} md={6} className="d-flex justify-content-md-start justify-content-center mb-3 mb-md-0">
            <div className={styles.viewToggle}>
              <Button className={`${styles.toggleButton} ${styles.active}`}>
                <CalendarIcon /> Həftə cədvəli
              </Button>
              <Button className={styles.toggleButton}>Gün cədvəli</Button>
            </div>
          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-md-end justify-content-center">
            <div className={styles.dateNav}>
              <Button variant="link" className={styles.arrow}>&larr;</Button>
              <span className={styles.date}>16 İyun 2025 – 20 İyun 2025</span>
              <Button variant="link" className={styles.arrow}>&rarr;</Button>
            </div>
          </Col>
        </Row>

        <Card className={styles.tableCard}>
          <Card.Body className="p-0">
            <div className={styles.tableWrapper}>
              <div className={styles.tableGridHeader}>
                <div className={styles.emptyCell}></div>
                {hours.map((hour, i) => (
                  <div key={i} className={styles.hourCell}>{hour}</div>
                ))}
              </div>

              {Object.entries(timetable).map(([day, lessons], i) => (
                <div key={i} className={styles.tableGridRow}>
                  <div className={styles.dayCell}>{day}</div>
                  {lessons.map((lesson, j) => (
                    <div key={j} className={styles.lessonCell}>
                      {lesson && <span>{lesson}</span>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </Container>
    </motion.div>
  );
}

export default ParentDiary;
