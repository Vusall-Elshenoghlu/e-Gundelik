
import { useState } from "react"
import { useForm, ValidationError } from "@formspree/react"
import { Container, Form, Button, Row, Col, Card, Alert, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import styles from "./Contact.module.css"
import { Helmet } from "react-helmet"

function Contact() {
  const [state, handleSubmit] = useForm("xovjylba")
  const navigate = useNavigate()
  const [phone, setPhone] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (state.succeeded) {
    return (
      <Container fluid className={styles.successContainer}>
        <Helmet>
          <title>Mesaj Göndərildi - Əlaqə</title>
        </Helmet>
        <div className={styles.successContent}>
          <div className={styles.successIcon}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#28a745" />
              <path d="m9 12 2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className={styles.successTitle}>Mesajınız Göndərildi!</h2>
          <p className={styles.successText}>Mesajınız üçün təşəkkür edirik. Tezliklə sizinlə əlaqə saxlayacağıq.</p>
          <Button variant="primary" onClick={() => navigate("/")} className={styles.backButton} size="lg">
            Ana Səhifəyə Qayıt
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <Container fluid className={styles.contactContainer}>
      <Helmet>
        <title>Bizimlə Əlaqə - Contact</title>
        <meta name="description" content="Bizimlə əlaqə saxlayın. Suallarınız və təklifləriniz üçün bizə yazın." />
      </Helmet>

      <div className={styles.backgroundOverlay}></div>

      <Container className={styles.contentContainer}>
        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            <div className={styles.headerSection}>
              <h1 className={styles.mainTitle}>Bizimlə Əlaqə</h1>
              <p className={styles.subtitle}>
                Suallarınız və ya təklifləriniz varsa, bizə yazın. Tezliklə cavab verəcəyik.
              </p>
            </div>

            <Card className={styles.contactCard}>
              <Card.Body className={styles.cardBody}>
                {state.errors && state.errors.length > 0 && (
                  <Alert variant="danger" className={styles.errorAlert}>
                    Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} className={styles.contactForm}>
                  <Row>
                    <Col md={12}>
                      <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>
                          Tam Ad <span className={styles.required}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className={styles.formControl}
                          placeholder="Adınızı və soyadınızı daxil edin"
                        />
                        <ValidationError prefix="Name" field="name" errors={state.errors} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>
                          Telefon <span className={styles.required}>*</span>
                        </Form.Label>
                        <div className={styles.phoneInputWrapper}>
                          <PhoneInput
                            international
                            defaultCountry="AZ"
                            value={phone}
                            onChange={setPhone}
                            className={styles.phoneInput}
                            required
                            placeholder="Telefon nömrənizi daxil edin"
                          />
                        </div>
                        <ValidationError prefix="Phone" field="phone" errors={state.errors} />
                        <small className={styles.helpText}>Nümunə: +994 50 123 45 67</small>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>
                          Email <span className={styles.required}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={styles.formControl}
                          placeholder="email@example.com"
                        />
                        <ValidationError prefix="Email" field="email" errors={state.errors} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>
                      Mesaj <span className={styles.required}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      required
                      className={`${styles.formControl} ${styles.textareaControl}`}
                      placeholder="Mesajınızı buraya yazın..."
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                    <small className={styles.helpText}>Minimum 10 simvol ({formData.message.length}/10)</small>
                  </Form.Group>

                  <div className={styles.submitSection}>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={state.submitting}
                      className={styles.submitButton}
                      size="lg"
                    >
                      {state.submitting ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Göndərilir...
                        </>
                      ) : (
                        <>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="me-2"
                          >
                            <path d="m22 2-7 20-4-9-9-4 20-7z" fill="currentColor" />
                          </svg>
                          Mesajı Göndər
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            <div className={styles.contactInfo}>
              <Row className="text-center">
                <Col md={4}>
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="10"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h6>Ünvan</h6>
                    <p>Code Academy, AF Business Hall</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h6>Telefon</h6>
                    <p>+994 60 372 72 46</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <polyline
                          points="22,6 12,13 2,6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h6>Email</h6>
                    <p>hvusal085@gmail.com</p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Contact
