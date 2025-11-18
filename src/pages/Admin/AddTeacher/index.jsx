import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col, Card, Form as BootstrapForm } from "react-bootstrap";
import { useAxiosWithAuth } from "../../../hooks/UseAxiosWithAuth";
import styles from "./AddTeacher.module.css";

const AddTeacher = () => {
  const [subjects, setSubjects] = useState([]);
  const axiosAuth = useAxiosWithAuth();

  // Mövzu yüklə
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axiosAuth.get(
          "https://turanapi2-001-site1.jtempurl.com/api/Subject/GetAllSubject"
        );
        setSubjects(res.data || []);
      } catch (error) {
        console.error("Subject yüklənmədi:", error);
      }
    };
    fetchSubjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    gender: "0",
    dob: "",
    address: "",
    subjectId: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Ad vacibdir"),
    lastName: Yup.string().required("Soyad vacibdir"),
    username: Yup.string().required("İstifadəçi adı vacibdir"),
    email: Yup.string().email("Düzgün email").required("Email vacibdir"),
    gender: Yup.string().oneOf(["0", "1"]).required("Cins vacibdir"),
    dob: Yup.date().required("Doğum tarixi vacibdir"),
    address: Yup.string().required("Ünvan vacibdir"),
    subjectId: Yup.string().required("Mövzu seçilməlidir"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      userName: values.username,
      email: values.email,
      gender: Number(values.gender),
      dob: values.dob,
      address: values.address,
      password: "",
      confirmPassword: "",
      childrenIds: [],
      parentId: "",
      subjectIds: [values.subjectId],
      teacherId: "",
      classId: "",
      student: "",
    };

    try {
      await axiosAuth.post(
        "https://turanapi2-001-site1.jtempurl.com/api/Auth/create-teacher",
        payload
      );
      alert("✅ Müəllim uğurla yaradıldı!");
      resetForm();
    } catch (error) {
      console.error("❌ Xəta:", error);
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
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <Row className="g-4">
                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label>Ad</BootstrapForm.Label>
                        <Field
                          name="firstName"
                          type="text"
                          className={`form-control ${errors.firstName && touched.firstName ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label>Soyad</BootstrapForm.Label>
                        <Field
                          name="lastName"
                          type="text"
                          className={`form-control ${errors.lastName && touched.lastName ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label>İstifadəçi adı</BootstrapForm.Label>
                        <Field
                          name="username"
                          type="text"
                          className={`form-control ${errors.username && touched.username ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage name="username" component="div" className="invalid-feedback" />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label>Email</BootstrapForm.Label>
                        <Field
                          name="email"
                          type="email"
                          className={`form-control ${errors.email && touched.email ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label>Cins</BootstrapForm.Label>
                        <Field as="select" name="gender" className={`form-select ${errors.gender && touched.gender ? "is-invalid" : ""}`}>
                          <option value="0">Kişi</option>
                          <option value="1">Qadın</option>
                        </Field>
                        <ErrorMessage name="gender" component="div" className="invalid-feedback" />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label>Doğum tarixi</BootstrapForm.Label>
                        <Field
                          name="dob"
                          type="date"
                          className={`form-control ${errors.dob && touched.dob ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage name="dob" component="div" className="invalid-feedback" />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={12}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label>Ünvan</BootstrapForm.Label>
                        <Field
                          name="address"
                          as="textarea"
                          rows={3}
                          className={`form-control ${errors.address && touched.address ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage name="address" component="div" className="invalid-feedback" />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label>Mövzu</BootstrapForm.Label>
                        <Field as="select" name="subjectId" className={`form-select ${errors.subjectId && touched.subjectId ? "is-invalid" : ""}`}>
                          <option value="">Seçin</option>
                          {subjects.map((subj) => (
                            <option key={subj.id} value={subj.id}>
                              {subj.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="subjectId" component="div" className="invalid-feedback" />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={12}>
                      <Button type="submit" disabled={isSubmitting} size="lg" className="w-100 mt-3">
                        {isSubmitting ? "Göndərilir..." : "Müəllim Yarat"}
                      </Button>
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
