"use client"

import { useContext, useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Container, Row, Col, Form as RBForm, Button, InputGroup, Card, Alert, Spinner } from "react-bootstrap"
import { FaEye, FaEyeSlash, FaLock, FaShieldAlt } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import { AuthContext } from "../../../context/AuthContext"
import { useAxiosWithAuth } from "../../../hooks/UseAxiosWithAuth"

const UpdatePassword = () => {
  const navigate = useNavigate()
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState("")
  const [successfullyUpdated, setSuccessfullyUpdated] = useState(false);

  const [success, setSuccess] = useState(false)
  const { user } = useContext(AuthContext)
  console.log(user)
  console.log(user.role)
  const axiosAuth = useAxiosWithAuth()

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  }

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      )
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError("")
      await axiosAuth.post("https://turansalimli-001-site1.ntempurl.com/api/Auth/update-password", values,)
      setSuccess(true)
      localStorage.removeItem("firstLogin")

      // Delay navigation to show success message
      setSuccessfullyUpdated(true)
    } catch (error) {
      setError("Password update failed. Please check your current password and try again.")
    }
    setSubmitting(false)
  }

  useEffect(() => {
    if (
      successfullyUpdated &&
      user &&
      typeof user === "object" &&
      user.role
    ) {

      if (user.role === "Admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "Teacher") {
        navigate("/teacher-panel");
      } else if (user.role === "Parent") {
        navigate("/parent-portal");
      } else if (user.role === "Student") {
        navigate("/student-page");
      } else {
        navigate("/");
      }
    }
  }, [successfullyUpdated, user]);
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  }

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  }

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-100"
        style={{ maxWidth: "500px" }}
      >
        <Row className="justify-content-center">
          <Col xs={12}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-4 p-md-5">
                <motion.div variants={itemVariants} className="text-center mb-4">
                  <div
                    className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <FaShieldAlt className="text-primary" size={32} />
                  </div>
                  <h2 className="fw-bold text-dark mb-2">Şifrəni dəyiş</h2>
                  <p className="text-muted mb-0">Hesabınızın təhlükəsizliyini təmin etmək üçün şifrənizi yeniləyin</p>
                </motion.div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert variant="danger" className="rounded-3 mb-4">
                        <small>Cari şifrə yalnışdır və ya yeni şifrə tələblərə cavab vermir.</small>
                      </Alert>
                    </motion.div>
                  )}

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert variant="success" className="rounded-3 mb-4">
                        <small>Şifrə uğurla yeniləndi! Yönləndirilirsiniz...</small>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ isSubmitting, errors, touched }) => (
                    <Form noValidate>
                      {/* Current Password */}
                      <motion.div variants={itemVariants}>
                        <RBForm.Group className="mb-4">
                          <RBForm.Label className="fw-semibold text-dark mb-2">
                            <FaLock className="me-2 text-muted" size={14} />
                            Cari şifrə
                          </RBForm.Label>
                          <InputGroup>
                            <Field name="currentPassword">
                              {({ field }) => (
                                <RBForm.Control
                                  {...field}
                                  type={showCurrent ? "text" : "password"}
                                  placeholder="Cari şifrənizi daxil edin"
                                  className={`rounded-start-3 border-end-0 ${errors.currentPassword && touched.currentPassword ? "is-invalid" : ""
                                    }`}
                                  style={{
                                    padding: "12px 16px",
                                    fontSize: "15px",
                                  }}
                                />
                              )}
                            </Field>
                            <Button
                              variant="outline-secondary"
                              className="rounded-end-3 border-start-0 px-3"
                              type="button"
                              onClick={() => setShowCurrent(!showCurrent)}
                              style={{ borderColor: "#dee2e6" }}
                            >
                              {showCurrent ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                            </Button>
                          </InputGroup>
                          <ErrorMessage name="currentPassword">
                            {(msg) => (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-danger mt-1"
                                style={{ fontSize: "13px" }}
                              >
                                {msg}
                              </motion.div>
                            )}
                          </ErrorMessage>
                        </RBForm.Group>
                      </motion.div>

                      {/* New Password */}
                      <motion.div variants={itemVariants}>
                        <RBForm.Group className="mb-4">
                          <RBForm.Label className="fw-semibold text-dark mb-2">
                            <FaLock className="me-2 text-muted" size={14} />
                            Yeni şifrə
                          </RBForm.Label>
                          <InputGroup>
                            <Field name="newPassword">
                              {({ field }) => (
                                <RBForm.Control
                                  {...field}
                                  type={showNew ? "text" : "password"}
                                  placeholder="Yeni şifrənizi daxil edin"
                                  className={`rounded-start-3 border-end-0 ${errors.newPassword && touched.newPassword ? "is-invalid" : ""
                                    }`}
                                  style={{
                                    padding: "12px 16px",
                                    fontSize: "15px",
                                  }}
                                />
                              )}
                            </Field>
                            <Button
                              variant="outline-secondary"
                              className="rounded-end-3 border-start-0 px-3"
                              type="button"
                              onClick={() => setShowNew(!showNew)}
                              style={{ borderColor: "#dee2e6" }}
                            >
                              {showNew ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                            </Button>
                          </InputGroup>
                          <ErrorMessage name="newPassword">
                            {(msg) => (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-danger mt-1"
                                style={{ fontSize: "13px" }}
                              >
                                {msg}
                              </motion.div>
                            )}
                          </ErrorMessage>
                        </RBForm.Group>
                      </motion.div>

                      {/* Confirm Password */}
                      <motion.div variants={itemVariants}>
                        <RBForm.Group className="mb-4">
                          <RBForm.Label className="fw-semibold text-dark mb-2">
                            <FaLock className="me-2 text-muted" size={14} />
                            Yeni şifrəni təsdiqləyin
                          </RBForm.Label>
                          <InputGroup>
                            <Field name="confirmPassword">
                              {({ field }) => (
                                <RBForm.Control
                                  {...field}
                                  type={showConfirm ? "text" : "password"}
                                  placeholder="Yeni şifrənini təsdiqləyin"
                                  className={`rounded-start-3 border-end-0 ${errors.confirmPassword && touched.confirmPassword ? "is-invalid" : ""
                                    }`}
                                  style={{
                                    padding: "12px 16px",
                                    fontSize: "15px",
                                  }}
                                />
                              )}
                            </Field>
                            <Button
                              variant="outline-secondary"
                              className="rounded-end-3 border-start-0 px-3"
                              type="button"
                              onClick={() => setShowConfirm(!showConfirm)}
                              style={{ borderColor: "#dee2e6" }}
                            >
                              {showConfirm ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                            </Button>
                          </InputGroup>
                          <ErrorMessage name="confirmPassword">
                            {(msg) => (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-danger mt-1"
                                style={{ fontSize: "13px" }}
                              >
                                {msg}
                              </motion.div>
                            )}
                          </ErrorMessage>
                        </RBForm.Group>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                          <Button
                            variant="primary"
                            type="submit"
                            disabled={isSubmitting || success}
                            className="w-100 rounded-3 fw-semibold"
                            size="lg"
                            style={{
                              padding: "12px",
                              fontSize: "16px",
                              background: "linear-gradient(135deg, #0d6efd 0%, #0056b3 100%)",
                              border: "none",
                            }}
                          >
                            {isSubmitting ? (
                              <>
                                <Spinner as="span" animation="border" size="sm" role="status" className="me-2" />
                                Şifrə yenilənir...
                              </>
                            ) : success ? (
                              "Şifrə uğurla yeniləndi!"
                            ) : (
                              "Şifrəni dəyiş"
                            )}
                          </Button>
                        </motion.div>
                      </motion.div>
                    </Form>
                  )}
                </Formik>

                <motion.div variants={itemVariants} className="text-center mt-4">
                  <small className="text-muted">Yeni şifrənizin güclü və unikal olduğuna əmin olun</small>
                </motion.div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </motion.div>
    </Container>
  )
}

export default UpdatePassword
