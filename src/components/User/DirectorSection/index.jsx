import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from "./DirectorSection.module.css";
import { FaArrowRight, FaAward, FaCalendarAlt } from 'react-icons/fa';

function DirectorSection() {
  return (
    <Container style={{ minHeight: "80vh", marginTop: "100px" }}>
      <Row className="align-items-center mb-4 flex-column flex-md-row">
        <Col xs={12} md={8}>
          <h1 className={styles.title}>Direktor üçün giriş</h1>
        </Col>
        <Col xs={12} md={4} className="d-flex justify-content-md-end justify-content-start mt-3 mt-md-0">
          <button className={styles.continueBtn}>
            Davam et <FaArrowRight />
          </button>
        </Col>
      </Row>

      <Row className="flex-column flex-md-row">
        <Col xs={12} md={4} className="mb-4 mb-md-0">
          <div className={`${styles.green} d-flex flex-column gap-3`}>
            <h4>Tədris prosesinin bir məkandan idarə olunması.</h4>
            <p className={styles.cardText} style={{marginTop:"20px"}}>
              Şagird, müəllim və valideynlər haqqında ətraflı məlumata baxa bilir, məktəbin statistik göstəriciləri və ani hesabatların əldə edilməsi imkanı mövcuddur.
            </p>
          </div>
        </Col>

        <Col xs={12} md={4} className="mb-4 mb-md-0">
          <div className={`${styles.gray} d-flex flex-column gap-4`}>
            <div className="d-flex gap-4 flex-wrap">
              <div className={styles.countDiv}>
                <h6 className={styles.count}>5+</h6>
              </div>
              <div className="d-flex flex-column">
                <h6 className={styles.cardTitle}>Dərs cədvəli</h6>
                <p className={styles.cardText}>
                  Tədris jurnallarındakı formativ və <br /> summativ qiymətləndirmənin <br /> nəticələrini izləyir.
                </p>
              </div>
            </div>

            <div className="d-flex gap-4 flex-wrap">
              <div className={styles.countDiv}>
                <h6 className={`${styles.count} ${styles.award}`}><FaCalendarAlt /></h6>
              </div>
              <div className="d-flex flex-column">
                <h6 className={styles.cardTitle}>Qiymetlere bax</h6>
                <p className={styles.cardText}>
                  Məktəb üzrə bütün siniflərin və <br /> müəllimlərin dərs cədvəllərini təyin <br /> edə bilir.
                </p>
              </div>
            </div>

            <div className="d-flex gap-4 flex-wrap">
              <div className={styles.countDiv}>
                <h6 className={`${styles.count} ${styles.award}`}><FaAward /></h6>
              </div>
              <div className="d-flex flex-column">
                <h6 className={styles.cardTitle}>Məktəb barədə rəylərə cavab ver</h6>
                <p className={styles.cardText}>
                  Valideynlər tərəfindən ünvanlanmış <br /> müraciətlərə baxır və cavablandırır.
                </p>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={12} md={4} className="d-flex justify-content-center">
          <div className={styles.imageCard}>
            <img
              className={styles.imageUrl}
              src="https://www.teachaway.com/sites/default/files/styles/threshold_992x992/public/qualities-in-a-principal-teachers-like.jpg?itok=803Ev-cY"
              alt="Director Panel"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DirectorSection;
