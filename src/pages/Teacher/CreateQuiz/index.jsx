import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Spinner,
  Form as BootstrapForm,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Select from "react-select"; // ✅ react-select əlavə et
import styles from "./CreateQuiz.module.css";

const CreateQuiz = () => {
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]); // ✅ SchoolClasses üçün state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const fetchClasses = async () => {
    try {
      const res = await axios.get(
        "https://turansalimli-001-site1.ntempurl.com/api/SchoolClass/GetAllSchoolClass"
      );
      setClasses(res.data);
    } catch (err) {
      toast.error("Sinifləri yükləmək alınmadı");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const initialValues = {
    subjectId: "",
    date: "",
    primary: false,
    classIds: [], // ✅ array şəklində saxlayacağıq
  };

  const validationSchema = Yup.object().shape({
    subjectId: Yup.string().required("Fənn seçin"),
    date: Yup.date().required("Tarix seçin"),
    classIds: Yup.array().min(1, "Ən az 1 sinif seçilməlidir"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      primary: values.primary,
      subjectId: values.subjectId,
      classId: values.classIds[0], // ✅ yalnız 1 classId göndərilirsə (əgər array qəbul edirsə, dəyiş)
      date: values.date,
    };

    try {
      setLoading(true);
      await axios.post(
        "https://turansalimli-001-site1.ntempurl.com/api/Quiz/CreateQuiz",
        payload
      );
      toast.success("Qiymətləndirmə uğurla əlavə edildi!");
      resetForm();
    } catch (error) {
      toast.error("Xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="shadow-lg p-4 rounded-4 border-0">
          <h3 className="text-center mb-4 text-primary">Yeni Qiymətləndirmə</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue, values }) => (
              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <BootstrapForm.Label>Fənn seçin</BootstrapForm.Label>
                    <Field
                      as="select"
                      name="subjectId"
                      className={`form-control ${
                        touched.subjectId && errors.subjectId ? "is-invalid" : ""
                      }`}
                    >
                      <option value="">Fənni seçin</option>
                      {subjects.map((subj) => (
                        <option key={subj.id} value={subj.id}>
                          {subj.name}
                        </option>
                      ))}
                    </Field>
                    {touched.subjectId && errors.subjectId && (
                      <div className="invalid-feedback">{errors.subjectId}</div>
                    )}
                  </Col>

                  <Col md={6}>
                    <BootstrapForm.Label>Tarix</BootstrapForm.Label>
                    <Field
                      type="datetime-local"
                      name="date"
                      className={`form-control ${
                        touched.date && errors.date ? "is-invalid" : ""
                      }`}
                    />
                    {touched.date && errors.date && (
                      <div className="invalid-feedback">{errors.date}</div>
                    )}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <BootstrapForm.Label>Sinif(lər)</BootstrapForm.Label>
                    <Select
                      isMulti
                      name="classIds"
                      options={classes.map((cls) => ({
                        label: cls.name,
                        value: cls.id,
                      }))}
                      className={touched.classIds && errors.classIds ? "is-invalid" : ""}
                      onChange={(selected) =>
                        setFieldValue(
                          "classIds",
                          selected ? selected.map((s) => s.value) : []
                        )
                      }
                      placeholder="Sinif seçin..."
                    />
                    {touched.classIds && errors.classIds && (
                      <div className="text-danger mt-1">{errors.classIds}</div>
                    )}
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col>
                    <BootstrapForm.Check
                      type="switch"
                      id="primary-switch"
                      label={
                        values.primary
                          ? "Böyük Summativ Qiymətləndirmə"
                          : "Kiçik Summativ Qiymətləndirmə"
                      }
                      checked={values.primary}
                      onChange={(e) => setFieldValue("primary", e.target.checked)}
                    />
                  </Col>
                </Row>

                <div className="d-grid">
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? <Spinner size="sm" /> : "Əlavə et"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </motion.div>
    </Container>
  );
};

export default CreateQuiz;
