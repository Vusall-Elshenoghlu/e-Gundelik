import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Container, Row, Col, Button, Card, Spinner, Form as BootstrapForm } from "react-bootstrap";
import styles from "./AddLesson.module.css";
import { AuthContext } from "../../../context/AuthContext";

const AddLesson = () => {
  const { user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const initialValues = {
    title: "",
    date: "",
    subjectId: "",
    classId: "",
    task: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Başlıq boş ola bilməz"),
    date: Yup.date().required("Tarix seçilməlidir"),
    subjectId: Yup.string().required("Fənn ID-si boş ola bilməz"),
    classId: Yup.string().required("Sinif ID-si boş ola bilməz"),
    task: Yup.string().required("Tapşırıq boş ola bilməz"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("Title", values.title);
      formData.append("Date", values.date);
      formData.append("SubjectId", values.subjectId);
      formData.append("ClassId", values.classId);
      formData.append("TeacherId", user?.userId || "");
      formData.append("Task", values.task);
      formData.append("StudentsProgress", JSON.stringify([{ studentId: null, result: null }]));


      if (videoFile) formData.append("Video", videoFile);

      await axios.post("http://turansalimli-001-site1.ntempurl.com/api/Lesson/CreateLesson", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      resetForm();
      setVideoFile(null);
    } catch (err) {
      console.error("Xəta baş verdi:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className={styles.pageWrapper}>
      <Card className={styles.card}>
        <h2 className="text-center mb-4">Yeni Dərs Əlavə Et</h2>
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
                    <BootstrapForm.Label>Başlıq</BootstrapForm.Label>
                    <Field name="title" className="form-control" />
                    <ErrorMessage name="title" component="div" className="text-danger" />
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Tarix</BootstrapForm.Label>
                    <Field name="date" type="datetime-local" className="form-control" />
                    <ErrorMessage name="date" component="div" className="text-danger" />
                  </BootstrapForm.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Fənn ID</BootstrapForm.Label>
                    <Field name="subjectId" className="form-control" />
                    <ErrorMessage name="subjectId" component="div" className="text-danger" />
                  </BootstrapForm.Group>
                </Col>
                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Sinif ID</BootstrapForm.Label>
                    <Field name="classId" className="form-control" />
                    <ErrorMessage name="classId" component="div" className="text-danger" />
                  </BootstrapForm.Group>
                </Col>
              </Row>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Tapşırıq</BootstrapForm.Label>
                <Field as="textarea" name="task" rows={3} className="form-control" />
                <ErrorMessage name="task" component="div" className="text-danger" />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-4">
                <BootstrapForm.Label>Video faylı (istəyə bağlı)</BootstrapForm.Label>
                <input
                  type="file"
                  className="form-control"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                />
              </BootstrapForm.Group>

              <div className="text-center">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner animation="border" size="sm" /> : "Əlavə Et"}
                </Button>
              </div>

              {success && (
                <div className="alert alert-success mt-3 text-center">
                  ✅ Dərs uğurla əlavə olundu!
                </div>
              )}
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default AddLesson;
