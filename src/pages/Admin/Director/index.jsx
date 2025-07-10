import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "./Director.module.css";

const Director = () => {
  // Statik məlumatlar - istəsən backend-dən gələnlərlə dəyişə bilərsən
  const directorName = "Rauf Məmmədov";
  const directorTitle = "Məktəb Direktoru";
  const directorBio = `Rauf Məmmədov uzun illər təhsil sahəsində fəaliyyət göstərir. Məktəbimizin inkişafına böyük töhfələr verir və təhsil keyfiyyətinin artırılmasına çalışır.`;
  
  // Statistikalar nümunə olaraq
  const stats = [
    { label: "Müəllimlər", number: 25 },
    { label: "Şagirdlər", number: 350 },
    { label: "Valideynlər", number: 340 },
  ];

  return (
    <Container className={styles.container}>
      <h1 className={styles.title}>{directorName}</h1>
      <h5 className={styles.subtitle}>{directorTitle}</h5>
      <p>{directorBio}</p>

      <Row className={styles.statsRow}>
        {stats.map((stat, idx) => (
          <Col key={idx} xs={12} md={4} className="mb-4">
            <Card className={styles.statCard}>
              <Card.Body>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Director;
