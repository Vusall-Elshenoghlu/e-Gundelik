import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Container, Row, Col, Card, Form as BootstrapForm } from "react-bootstrap";
import styles from "./AddTeacher.module.css";
import { useAxiosWithAuth } from "../../../hooks/UseAxiosWithAuth";

const AddTeacher = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    gender: 0,
    dob: "",
    address: "",
    imgUrl: "",
    password: null,
    confirmPassword: null,
  };

  const axiosAuth = useAxiosWithAuth();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Ad vacibdir"),
    lastName: Yup.string().required("Soyad vacibdir"),
    username: Yup.string().required("İstifadəçi adı vacibdir"),
    email: Yup.string().email("Düzgün email daxil edin").required("Email vacibdir"),
    gender: Yup.number().oneOf([0, 1], "Cins seçin").required("Cins vacibdir"),
    dob: Yup.date().required("Doğum tarixi vacibdir"),
    address: Yup.string().required("Ünvan vacibdir"),
    imgUrl: Yup.string().url("Şəkil URL düzgün deyil").nullable().notRequired(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const payload = {
        ...values,
        imgUrl: values.imgUrl === "" ? "" : values.imgUrl,
        password: "",
        confirmPassword: "",
        childrenIds: [],
        parentId: "",
      };

      const response = await axiosAuth.post(
        "https://turansalimli-001-site1.ntempurl.com/api/Auth/create-teacher",
        payload
      );

      alert("✅ Müəllim uğurla yaradıldı!");
      resetForm();
    } catch (error) {
      console.error("❌ Xəta baş verdi:", error);
      alert("Xəta oldu. Zəhmət olmasa məlumatları yoxla.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Container fluid className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Yeni Müəllim Yarat</h1>
          <p className={styles.subtitle}>Zəhmət olmasa bütün zəruri məlumatları doldurun</p>
        </div>

        <Card className={styles.formCard}>
          <Card.Body className={styles.cardBody}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <Row className="g-4">
                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label className={styles.label}>Ad</BootstrapForm.Label>
                        <Field name="firstName">
                          {({ field }) => (
                            <BootstrapForm.Control
                              {...field}
                              type="text"
                              placeholder="Adınızı daxil edin"
                              className={`${styles.input} ${errors.firstName && touched.firstName ? styles.inputError : ""}`}
                            />
                          )}
                        </Field>
                        <ErrorMessage name="firstName" component="div" className={styles.errorText} />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label className={styles.label}>Soyad</BootstrapForm.Label>
                        <Field name="lastName">
                          {({ field }) => (
                            <BootstrapForm.Control
                              {...field}
                              type="text"
                              placeholder="Soyadınızı daxil edin"
                              className={`${styles.input} ${errors.lastName && touched.lastName ? styles.inputError : ""}`}
                            />
                          )}
                        </Field>
                        <ErrorMessage name="lastName" component="div" className={styles.errorText} />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label className={styles.label}>İstifadəçi Adı</BootstrapForm.Label>
                        <Field name="username">
                          {({ field }) => (
                            <BootstrapForm.Control
                              {...field}
                              type="text"
                              placeholder="İstifadəçi adını daxil edin"
                              className={`${styles.input} ${errors.username && touched.username ? styles.inputError : ""}`}
                            />
                          )}
                        </Field>
                        <ErrorMessage name="username" component="div" className={styles.errorText} />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label className={styles.label}>Email</BootstrapForm.Label>
                        <Field name="email">
                          {({ field }) => (
                            <BootstrapForm.Control
                              {...field}
                              type="email"
                              placeholder="Email ünvanınızı daxil edin"
                              className={`${styles.input} ${errors.email && touched.email ? styles.inputError : ""}`}
                            />
                          )}
                        </Field>
                        <ErrorMessage name="email" component="div" className={styles.errorText} />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label className={styles.label}>Cins</BootstrapForm.Label>
                        <Field name="gender">
                          {({ field }) => (
                            <BootstrapForm.Select
                              {...field}
                              className={`${styles.input} ${errors.gender && touched.gender ? styles.inputError : ""}`}
                            >
                              <option value="">Cins seçin</option>
                              <option value={0}>Kişi</option>
                              <option value={1}>Qadın</option>
                            </BootstrapForm.Select>
                          )}
                        </Field>
                        <ErrorMessage name="gender" component="div" className={styles.errorText} />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label className={styles.label}>Doğum Tarixi</BootstrapForm.Label>
                        <Field name="dob">
                          {({ field }) => (
                            <BootstrapForm.Control
                              {...field}
                              type="date"
                              className={`${styles.input} ${errors.dob && touched.dob ? styles.inputError : ""}`}
                            />
                          )}
                        </Field>
                        <ErrorMessage name="dob" component="div" className={styles.errorText} />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={12}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label className={styles.label}>Ünvan</BootstrapForm.Label>
                        <Field name="address">
                          {({ field }) => (
                            <BootstrapForm.Control
                              {...field}
                              as="textarea"
                              rows={4}
                              placeholder="Ünvanınızı daxil edin"
                              className={`${styles.input} ${styles.textarea} ${errors.address && touched.address ? styles.inputError : ""}`}
                            />
                          )}
                        </Field>
                        <ErrorMessage name="address" component="div" className={styles.errorText} />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={12}>
                      <div className={styles.buttonContainer}>
                        <Button type="submit" disabled={isSubmitting} className={styles.submitButton} size="lg">
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Göndərilir...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-plus me-2"></i>
                              Müəllim Yarat
                            </>
                          )}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AddTeacher;
