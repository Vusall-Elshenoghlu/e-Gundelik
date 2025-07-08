import { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Container, Row, Col, Card, Button, Form as BootstrapForm } from "react-bootstrap"
import styles from "./AddStudent.module.css"
import Swal from "sweetalert2"
import { useAxiosWithAuth } from "../../../hooks/UseAxiosWithAuth"

const AddStudent = () => {
  const axiosAuth = useAxiosWithAuth()
  const [classes, setClasses] = useState([])

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axiosAuth.get("https://turansalimli-001-site1.ntempurl.com/api/SchoolClass/GetAllSchoolClass")
        setClasses(res.data)
      } catch (err) {
        console.error("Sinifləri gətirə bilmədik:", err)
      }
    }
    fetchClasses()
  }, [])

  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    gender: "",
    dob: "",
    address: "",
    imgUrl: "",
    password: "",
    confirmPassword: "",
    schoolClassId: ""
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().min(2, "Ad ən azı 2 simvoldan ibarət olmalıdır").required("Ad vacibdir"),
    lastName: Yup.string().min(2, "Soyad ən azı 2 simvoldan ibarət olmalıdır").required("Soyad vacibdir"),
    userName: Yup.string().min(3, "İstifadəçi adı ən azı 3 simvoldan ibarət olmalıdır").required("İstifadəçi adı vacibdir"),
    email: Yup.string().email("Yanlış email ünvanı").required("Email vacibdir"),
    gender: Yup.number().required("Cinsiyyət vacibdir"),
    dob: Yup.date().max(new Date(), "Doğum tarixi gələcəkdə ola bilməz").required("Doğum tarixi vacibdir"),
    address: Yup.string().min(5, "Ünvan ən azı 5 simvoldan ibarət olmalıdır").required("Ünvan vacibdir"),
    schoolClassId: Yup.string().required("Sinif seçilməlidir")
  })

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const payload = {
        ...values,
        gender: Number(values.gender),
        imgUrl: values.imgUrl || "",
        password: "",
        confirmPassword: "",
        childrenIds: [],
        parentId: ""
      }

      const response = await axiosAuth.post(
        "https://turansalimli-001-site1.ntempurl.com/api/Auth/create-student",
        payload
      )

      console.log(response.data)
      Swal.fire("Uğur!", "Şagird uğurla əlavə edildi", "success")
      resetForm()
    } catch (error) {
      console.error("Xəta:", error)
      Swal.fire("Xəta!", error.response.data.message, "error")
    }
  }

  return (
    <div className={styles.pageWrapper}>
      <Container fluid className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Yeni Şagird Əlavə Et</h1>
          <p className={styles.subtitle}>Zəhmət olmasa bütün tələb olunan məlumatları doldurun</p>
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
                              placeholder="Ad daxil edin"
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
                              placeholder="Soyad daxil edin"
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
                        <Field name="userName">
                          {({ field }) => (
                            <BootstrapForm.Control
                              {...field}
                              type="text"
                              placeholder="İstifadəçi adını daxil edin"
                              className={`${styles.input} ${errors.userName && touched.userName ? styles.inputError : ""}`}
                            />
                          )}
                        </Field>
                        <ErrorMessage name="userName" component="div" className={styles.errorText} />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label className={styles.label}>Email Ünvanı</BootstrapForm.Label>
                        <Field name="email">
                          {({ field }) => (
                            <BootstrapForm.Control
                              {...field}
                              type="email"
                              placeholder="Email ünvanı daxil edin"
                              className={`${styles.input} ${errors.email && touched.email ? styles.inputError : ""}`}
                            />
                          )}
                        </Field>
                        <ErrorMessage name="email" component="div" className={styles.errorText} />
                      </BootstrapForm.Group>
                    </Col>

                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label className={styles.label}>Cinsiyyət</BootstrapForm.Label>
                        <Field name="gender">
                          {({ field }) => (
                            <BootstrapForm.Select
                              {...field}
                              className={`${styles.input} ${errors.gender && touched.gender ? styles.inputError : ""}`}
                            >
                              <option value="">Cinsiyyəti seçin</option>
                              <option value="0">Kişi</option>
                              <option value="1">Qadın</option>
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

                    {/* 🔥 Sinif Seçimi */}
                    <Col md={6}>
                      <BootstrapForm.Group>
                        <BootstrapForm.Label className={styles.label}>Sinif</BootstrapForm.Label>
                        <Field name="schoolClassId">
                          {({ field }) => (
                            <BootstrapForm.Select
                              {...field}
                              className={`${styles.input} ${errors.schoolClassId && touched.schoolClassId ? styles.inputError : ""}`}
                            >
                              <option value="">Sinif seçin</option>
                              {classes.map((cls) => (
                                <option key={cls.id} value={cls.id}>{cls.name}</option>
                              ))}
                            </BootstrapForm.Select>
                          )}
                        </Field>
                        <ErrorMessage name="schoolClassId" component="div" className={styles.errorText} />
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
                              placeholder="Tam ünvanı daxil edin"
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
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Şagird əlavə olunur...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-plus me-2"></i>
                          Şagird Əlavə Et
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
