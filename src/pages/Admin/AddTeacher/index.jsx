import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Container, Row, Col, Form as BootstrapForm } from "react-bootstrap";
import styles from "./AddTeacher.module.css";

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
    try {      const payload = {
        ...values,
        imgUrl: values.imgUrl === "" ? "" : values.imgUrl,
        password: "",
        confirmPassword: "",
        childrenIds: [],
        parentId: "",
      };

      const response = await axios.post(
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
    <Container className="mt-4" style={{ height: "100vh", width: "130%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className={styles.formContainer}>
        <h3 className={styles.title}>Yeni Müəllim Yarat</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Row>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label className={styles.label}>Ad</BootstrapForm.Label>
                    <Field name="firstName" className={`form-control ${styles.input}`} />
                    <ErrorMessage name="firstName" component="div" className={styles.error} />
                  </BootstrapForm.Group>
                </Col>

                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label className={styles.label}>Soyad</BootstrapForm.Label>
                    <Field name="lastName" className={`form-control ${styles.input}`} />
                    <ErrorMessage name="lastName" component="div" className={styles.error} />
                  </BootstrapForm.Group>
                </Col>

                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label className={styles.label}>İstifadəçi adı</BootstrapForm.Label>
                    <Field name="username" className={`form-control ${styles.input}`} />
                    <ErrorMessage name="username" component="div" className={styles.error} />
                  </BootstrapForm.Group>
                </Col>

                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label className={styles.label}>Email</BootstrapForm.Label>
                    <Field name="email" type="email" className={`form-control ${styles.input}`} />
                    <ErrorMessage name="email" component="div" className={styles.error} />
                  </BootstrapForm.Group>
                </Col>

                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label className={styles.label}>Cins</BootstrapForm.Label>
                    <Field as="select" name="gender" className={`form-select ${styles.input}`}>
                      <option value={0}>Kişi</option>
                      <option value={1}>Qadın</option>
                    </Field>
                    <ErrorMessage name="gender" component="div" className={styles.error} />
                  </BootstrapForm.Group>
                </Col>

                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label className={styles.label}>Doğum tarixi</BootstrapForm.Label>
                    <Field name="dob" type="date" className={`form-control ${styles.input}`} />
                    <ErrorMessage name="dob" component="div" className={styles.error} />
                  </BootstrapForm.Group>
                </Col>

                <Col md={12}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label className={styles.label}>Ünvan</BootstrapForm.Label>
                    <Field name="address" className={`form-control ${styles.input}`} />
                    <ErrorMessage name="address" component="div" className={styles.error} />
                  </BootstrapForm.Group>
                </Col>

                

                <Col md={12}>
                  <Button type="submit" className={`w-100 ${styles.submitBtn}`}>
                    Yarat
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default AddTeacher;
