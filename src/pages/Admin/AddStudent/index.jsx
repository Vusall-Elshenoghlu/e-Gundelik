import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Container, Row, Col, Card, Button, Form as BootstrapForm } from "react-bootstrap"
import Swal from "sweetalert2"
import styles from "./AddStudent.module.css"
import { useAxiosWithAuth } from "../../../hooks/UseAxiosWithAuth";


const AddStudent = () => {
  const validationSchema = Yup.object({
    firstName: Yup.string().min(2, "First name must be at least 2 characters").required("First name is required"),
    lastName: Yup.string().min(2, "Last name must be at least 2 characters").required("Last name is required"),
    userName: Yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    gender: Yup.number().required("Gender is required"),
    dob: Yup.date().max(new Date(), "Date of birth cannot be in the future").required("Date of birth is required"),
    address: Yup.string().min(5, "Address must be at least 5 characters").required("Address is required"),
  })

  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    gender: "",
    dob: "",
    address: "",
    imgUrl: "",
    password: null,
    confirmPassword: null,
  }

    const axiosAuth = useAxiosWithAuth()
  
  const handleSubmit = async (values, { resetForm }) => {
    try {
        const payload = {
        ...values,
        gender: Number(values.gender),
        imgUrl: values.imgUrl === "" ? "" : values.imgUrl,
        password: "",
        confirmPassword: "",
        childrenIds: [],
        parentId: "",
      };

      const response = await axiosAuth.post(
        "https://turansalimli-001-site1.ntempurl.com/api/Auth/create-student",payload
      );
      console.log(response.data)

      alert("✅ Sagird uğurla yaradıldı!");
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
          <h1 className={styles.title}>Add New Student</h1>
          <p className={styles.subtitle}>Please fill in all the required information</p>
        </div>

        <Card className={styles.formCard}>
          <Card.Body className={styles.cardBody}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <Row className="g-4">
                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label className={styles.label}>
                          <i className="fas fa-user me-2"></i>First Name
                        </BootstrapForm.Label>
                        <Field name="firstName">
                          {({ field }) => (
                            <BootstrapForm.Control
                              {...field}
                              type="text"
                              placeholder="Enter first name"
                              className={`${styles.input} ${errors.firstName && touched.firstName ? styles.inputError : ""}`}
                            />
                          )}
                        </Field>
                        <ErrorMessage name="firstName" component="div" className={styles.errorText} />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label className={styles.label}>
                          <i className="fas fa-user me-2"></i>Last Name
                        </BootstrapForm.Label>
                        <Field name="lastName">
                          {({ field }) => (
                            <BootstrapForm.Control
                              {...field}
                              type="text"
                              placeholder="Enter last name"
                              className={`${styles.input} ${errors.lastName && touched.lastName ? styles.inputError : ""}`}
                            />
                          )}
                        </Field>
                        <ErrorMessage name="lastName" component="div" className={styles.errorText} />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label className={styles.label}>
                          <i className="fas fa-at me-2"></i>Username
                        </BootstrapForm.Label>
                        <Field name="userName">
                          {({ field }) => (
                            <BootstrapForm.Control
                              {...field}
                              type="text"
                              placeholder="Enter username"
                              className={`${styles.input} ${errors.userName && touched.userName ? styles.inputError : ""}`}
                            />
                          )}
                        </Field>
                        <ErrorMessage name="userName" component="div" className={styles.errorText} />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label className={styles.label}>
                          <i className="fas fa-envelope me-2"></i>Email Address
                        </BootstrapForm.Label>
                        <Field name="email">
                          {({ field }) => (
                            <BootstrapForm.Control
                              {...field}
                              type="email"
                              placeholder="Enter email address"
                              className={`${styles.input} ${errors.email && touched.email ? styles.inputError : ""}`}
                            />
                          )}
                        </Field>
                        <ErrorMessage name="email" component="div" className={styles.errorText} />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label className={styles.label}>
                          <i className="fas fa-venus-mars me-2"></i>Gender
                        </BootstrapForm.Label>
                        <Field name="gender">
                          {({ field }) => (
                            <BootstrapForm.Select
                              {...field}
                              className={`${styles.input} ${errors.gender && touched.gender ? styles.inputError : ""}`}
                            >
                              <option value="">Select Gender</option>
                              <option value="0">Male</option>
                              <option value="1">Female</option>
                            </BootstrapForm.Select>
                          )}
                        </Field>
                        <ErrorMessage name="gender" component="div" className={styles.errorText} />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label className={styles.label}>
                          <i className="fas fa-calendar me-2"></i>Date of Birth
                        </BootstrapForm.Label>
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
                        <BootstrapForm.Label className={styles.label}>
                          <i className="fas fa-map-marker-alt me-2"></i>Address
                        </BootstrapForm.Label>
                        <Field name="address">
                          {({ field }) => (
                            <BootstrapForm.Control
                              {...field}
                              as="textarea"
                              rows={4}
                              placeholder="Enter full address"
                              className={`${styles.input} ${styles.textarea} ${errors.address && touched.address ? styles.inputError : ""}`}
                            />
                          )}
                        </Field>
                        <ErrorMessage name="address" component="div" className={styles.errorText} />
                      </BootstrapForm.Group>
                    </Col>
                  </Row>

                  <div className={styles.buttonContainer}>
                    <Button type="submit" disabled={isSubmitting} className={styles.submitButton} size="lg">
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Adding Student...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-plus me-2"></i>
                          Add Student
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default AddStudent
