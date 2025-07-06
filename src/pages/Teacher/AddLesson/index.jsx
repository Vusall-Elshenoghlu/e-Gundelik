import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Spinner,
  Form as BootstrapForm,
} from "react-bootstrap";
import styles from "./AddLesson.module.css";
import { AuthContext } from "../../../context/AuthContext";

const AddLesson = () => {
  const { user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);

  // 🔽 Fənnləri və Sinifləri yüklə
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectRes, classRes] = await Promise.all([
          axios.get("https://turansalimli-001-site1.ntempurl.com/api/Subject/GetAllSubject"),
          axios.get("https://turansalimli-001-site1.ntempurl.com/api/SchoolClass/GetAllSchoolClass"),
        ]);
        setSubjects(subjectRes.data);
        setClasses(classRes.data);
      } catch (err) {
        console.error("Məlumatlar yüklənərkən xəta:", err);
      }
    };

    fetchData();
  }, []);

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
    subjectId: Yup.string().required("Fənn seçilməlidir"),
    classId: Yup.string().required("Sinif seçilməlidir"),
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
      if (videoFile) formData.append("VideoUrl", videoFile);
      formData.append("StudentsProgress", JSON.stringify([]));

      await axios.post(
        "https://turansalimli-001-site1.ntempurl.com/api/Lesson/CreateLesson",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess(true);
      resetForm();
      setVideoFile(null);
    } catch (error) {
      console.error("Dərs əlavə edilərkən xəta baş verdi:", error);
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
            <Form encType="multipart/form-data">
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
                    <BootstrapForm.Label>Fənn Seç</BootstrapForm.Label>
                    <Field as="select" name="subjectId" className="form-control">
                      <option value="">-- Fənn seçin --</option>
                      {subjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="subjectId" component="div" className="text-danger" />
                  </BootstrapForm.Group>
                </Col>

                <Col md={6}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Sinif Seç</BootstrapForm.Label>
                    <Field as="select" name="classId" className="form-control">
                      <option value="">-- Sinif seçin --</option>
                      {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.name}
                        </option>
                      ))}
                    </Field>
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
