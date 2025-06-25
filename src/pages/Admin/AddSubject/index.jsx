import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Form as BootstrapForm, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const AddSubject = () => {
  const initialValues = {
    name: "",
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Ad ən azı 2 simvol olmalıdır")
      .max(50, "Ad çox uzun oldu")
      .required("Ad mütləqdir"),
    description: Yup.string()
      .min(5, "Təsvir ən azı 5 simvol olmalıdır")
      .max(255, "Təsvir çox uzun oldu")
      .required("Təsvir mütləqdir"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      const response = await axios.post('https://turansalimli-001-site1.ntempurl.com/api/Subject/CreateSubject', values);
      console.log(response.data)
      if (response.data.isSuccess) {
        setStatus({ success: "Fənn uğurla əlavə olundu!" });
        resetForm();
      } else {
        setStatus({ error: response.data.message || "Xəta baş verdi" });
      }
    } catch (error) {
  console.log("Error response:", error.response.data); // burda cavabı göstər
  setStatus({ error: error.response?.data?.Message || error.message || "Server xətası" });
}
    setSubmitting(false);
  };

  return (
    <Container style={{width:"1230px",maxWidth:"auto", minHeight:"100vh", backgroundColor: "rgba(234, 228, 228, 0.85)" }} className="d-flex justify-content-center align-items-center">
      <Card className="shadow-sm" style={{width:"800px", height:"70vh",padding:"5%"}}>
        <Card.Body>
          <h3 className="mb-4">Yeni Fənn Əlavə Et</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form>
                <BootstrapForm.Group className="mb-3" controlId="formName">
                  <BootstrapForm.Label>Fənnin Adı</BootstrapForm.Label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Fənnin adını daxil edin"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger mt-1"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3" controlId="formDescription">
                  <BootstrapForm.Label>Təsviri</BootstrapForm.Label>
                  <Field
                    as="textarea"
                    name="description"
                    rows={4}
                    placeholder="Fənn haqqında qısa təsviri daxil edin"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-danger mt-1"
                  />
                </BootstrapForm.Group>

                {status && status.error && (
                  <div className="alert alert-danger">{status.error}</div>
                )}
                {status && status.success && (
                  <div className="alert alert-success">{status.success}</div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-100"
                  variant="primary"
                >
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

export default AddSubject;
