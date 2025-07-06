import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import styles from './Contact.module.css';
import { Helmet } from 'react-helmet';

function Contact() {
  const [state, handleSubmit] = useForm("xovjylba");
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');

  if (state.succeeded) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="text-center">
          <p className="text-success">Thank you for your message!</p>
          <Button variant="primary" onClick={() => navigate("/")} className="mt-3">
            Back to Home
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container
      fluid
      className="py-5"
      style={{
        background: 'linear-gradient(to right, #3a0ca3, #7209b7)',
        minHeight: '100vh',
      }}
    >
      <Helmet>
        <title>Contact</title>
      </Helmet>
      <h2 className="text-center mb-4">Bizimlə əlaqə</h2>
      <Row className="justify-content-center">
        <Col lg={6} md={8} sm={12}>
          <Form onSubmit={handleSubmit} className={`shadow p-4 rounded ${styles.contactForm}`}>
            <Form.Group className="mb-3">
              <Form.Label>Tam Ad</Form.Label>
              <Form.Control
                type="text"
                name="name"
                required
                className={`form-control ${styles.customInput}`}
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telefon</Form.Label>
              <PhoneInput
                international
                defaultCountry="AZ"
                value={phone}
                onChange={setPhone}
                className={`form-control ${styles.customInput}`}
                required
              />
              <ValidationError prefix="Phone" field="phone" errors={state.errors} />
              <small className={styles.exampleText}>Nümunə: +994 50 123 45 67</small>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Ünvanı</Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                className={`form-control ${styles.customInput}`}
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Messaj</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                rows={4}
                required
                className={`form-control ${styles.customInput}`}
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={state.submitting}
              className={`w-100 ${styles.customBtn}`}
            >
              {state.submitting ? "Göndərilir..." : "Göndər"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
