import React, { useState, useEffect } from 'react'; // useEffect əlavə et
import { useForm, ValidationError } from '@formspree/react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import styles from './ContactSection.module.css';

function ContactSection() {
    const [state, handleSubmit] = useForm("xovjylba");
    const [phone, setPhone] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    useEffect(() => {
        if (state.succeeded) {
            setFormData({ name: '', email: '', message: '' });
            setPhone('');
        }
    }, [state.succeeded]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const customSubmit = (e) => {
        e.preventDefault();
        handleSubmit(e);
    };

    return (
        <Container className="py-5">
            <h2 className="text-center mb-5">Contact Us</h2>
            <Row>

                <Col lg={8} md={12} className="mb-4">
                    <div className={styles.mapContainer}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.428674853683!2d49.85137057604535!3d40.37719087144594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d079efb5163%3A0xc20aa51a5f0b5e01!2sCode%20Academy!5e0!3m2!1sen!2saz!4v1751359632778!5m2!1sen!2saz"
                            width="100%"
                            height="500px"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Our location"
                        ></iframe>
                    </div>
                </Col>

                <Col lg={4} md={4}>

                    <div className={styles.messageWrapper}>
                        {state.succeeded && (
                            <div className={styles.successMessage}>
                                Sizin mesajınız uğurla göndərildi!
                            </div>
                        )}
                    </div>

                    <Form onSubmit={customSubmit} className={`shadow p-4 rounded ${styles.contactForm}`}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tam Ad</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className={styles.customInput}
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
                                className={styles.customInput}
                                required
                            />
                            <ValidationError prefix="Phone" field="phone" errors={state.errors} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email Ünvanı</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className={styles.customInput}
                            />
                            <ValidationError prefix="Email" field="email" errors={state.errors} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mesaj</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="message"
                                rows={4}
                                required
                                value={formData.message}
                                onChange={handleChange}
                                className={styles.customInput}
                            />
                            <ValidationError prefix="Message" field="message" errors={state.errors} />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={state.submitting}
                            className={`w-100 ${styles.customBtn}`}
                        >
                            {state.submitting ? "Sending..." : "Send Message"}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default ContactSection;
