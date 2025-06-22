import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './ParentSection.module.css';
import parentSection from '../../../assets/images/parentSection.jpg';

function ParentSection() {
  return (
    <Container className="my-5">
      {/* Üst hissə: Başlıq və Davam et düyməsi */}
      <Row className="justify-content-between align-items-center mb-4">
        <Col xs={12} md="auto">
          <h2 className={styles.title}>Valideynlər üçün giriş</h2>
        </Col>
        <Col xs={12} md="auto">
          <Button className={`${styles.continueBtn} px-4 py-2`}>
            Davam et <span className="ms-2">→</span>
          </Button>
        </Col>
      </Row>

      {/* Alt hissə: Şəkil və məlumat hissəsi */}
      <Row className={`${styles.contentBox} p-4 align-items-center`}>
        {/* Sol tərəf: şəkil */}
        <Col lg={5} className="mb-4 mb-lg-0">
          <div className={styles.imageCard}>
            <img
              src={parentSection}
              alt="boy with lupa"
              className={styles.image}
            />
          </div>
        </Col>

        {/* Sağ tərəf */}
        <Col lg={7}>
          <h4 className="fw-semibold mb-3">Övladın barədə məlumatlı ol.</h4>
          <p className="text-muted mb-4">
            Övladının təlim nəticələrini və həftəlik dərs cədvəlini görə bilir.
            Həmçinin övladının təhsil aldığı məktəbin rəhbərliyi ilə əks əlaqə qura bilir.
          </p>

          <Row className="g-3">
            {/* Box 1 */}
            <Col md={4}>
              <div className={`${styles.infoBox} text-center`}>
                <div className={`${styles.iconPurple}`}>5+</div>
                <h6 className="fw-bold">Qiymətlərə bax.</h6>
                <p className="small text-muted m-0">
                  Təlim prosesində göstərdiyi nailiyyətlərə bax.
                </p>
              </div>
            </Col>

            {/* Box 2 */}
            <Col md={4}>
              <div className={`${styles.infoBox} text-center`}>
                <div className={`${styles.iconPink}`}>
                  <i className="bi bi-table"></i>
                </div>
                <h6 className="fw-bold">Dərs cədvəli.</h6>
                <p className="small text-muted m-0">
                  Övladının həftəlik dərs cədvəlinə bax.
                </p>
              </div>
            </Col>

            {/* Box 3 */}
            <Col md={4}>
              <div className={`${styles.infoBox} text-center`}>
                <div className={`${styles.iconGreen}`}>
                  <i className="bi bi-chat-dots"></i>
                </div>
                <h6 className="fw-bold">Məktəb barədə rəyini bildir.</h6>
                <p className="small text-muted m-0">
                  Direktor ilə birbaşa əks-əlaqə yarat.
                </p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ParentSection;
