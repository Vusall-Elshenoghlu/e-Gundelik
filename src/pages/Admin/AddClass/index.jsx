import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Form as BootstrapForm, Container, Card } from "react-bootstrap";
import axios from "axios";

const AddClass = () => {
  const [subjects, setSubjects] = useState([]);

  const initialValues = {
    name: "",
    subject: "",
    classTeacher: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Sinif adı ən azı 2 simvol olmalıdır")
      .max(50, "Sinif adı çox uzun oldu")
      .required("Sinif adı mütləqdir"),
    subject: Yup.string().required("Fənn seçmək mütləqdir"),
    classTeacher: Yup.string()
      .min(2, "Sinif rəhbəri adı ən azı 2 simvol olmalıdır")
      .max(50, "Ad çox uzun oldu")
      .required("Sinif rəhbəri mütləqdir"),
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get('https://turansalimli-001-site1.ntempurl.com/api/Subject/GetAllSubject');
        console.log(res.data)
        setSubjects(res.data || []);
      } catch (error) {
        console.error("Fənnlər yüklənərkən xəta:", error);
      }
    };
    fetchSubjects();
  }, []);

  const onSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    const payload = {
      name: values.name,
      subjectIds: [values.subject], // Array formatında olmalıdır
      bossTeacherId: values.classTeacher, // GUID formatında müəllim ID-si olmalıdır
    };
    try {
      const response = await axios.post('https://turansalimli-001-site1.ntempurl.com/api/SchoolClass/CreateSchoolClass', payload);
      console.log(response.data)
      if (response.data.success) {
        setStatus({ success: "Sinif uğurla əlavə olundu!" });
        resetForm();
      } else {
        setStatus({ error: response.data.Message || "Xəta baş verdi" });
      }
    } catch (error) {
      console.log("Error response:", error.response); // burda cavabı göstər
      setStatus({ error: error.response?.data?.Message || error.message || "Server xətası" });
    }
    setSubmitting(false);
  };

  return (
    <Container
      style={{ width: "1230px", maxWidth: "auto", minHeight: "100vh", backgroundColor: "rgba(234, 228, 228, 0.85)" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Card className="shadow-sm" style={{ width: "800px", height: "70vh", padding: "5%" }}>
        <Card.Body>
          <h3 className="mb-4">Yeni Sinif Əlavə Et</h3>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting, status }) => (
              <Form>
                <BootstrapForm.Group className="mb-3" controlId="formName">
                  <BootstrapForm.Label>Sinif Adı</BootstrapForm.Label>
                  <Field name="name" type="text" placeholder="Sinif adını daxil edin" className="form-control" />
                  <ErrorMessage name="name" component="div" className="text-danger mt-1" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3" controlId="formSubject">
                  <BootstrapForm.Label>Fənn seçin</BootstrapForm.Label>
                  <Field as="select" name="subject" className="form-select">
                    <option value="">Fənn seçin...</option>
                    {subjects.map((subject) => (
                      <option key={subject.id || subject._id} value={subject.id || subject._id}>
                        {subject.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="subject" component="div" className="text-danger mt-1" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3" controlId="formClassTeacher">
                  <BootstrapForm.Label>Sinif Rəhbəri</BootstrapForm.Label>
                  <Field
                    name="classTeacher"
                    type="text"
                    placeholder="Sinif rəhbərinin adını daxil edin"
                    className="form-control"
                  />
                  <ErrorMessage name="classTeacher" component="div" className="text-danger mt-1" />
                </BootstrapForm.Group>

                {status && status.error && <div className="alert alert-danger">{status.error}</div>}
                {status && status.success && <div className="alert alert-success">{status.success}</div>}

                <Button type="submit" disabled={isSubmitting} className="w-100" variant="primary">
                  {isSubmitting ? "Yüklənir..." : "Əlavə et"}
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddClass;
