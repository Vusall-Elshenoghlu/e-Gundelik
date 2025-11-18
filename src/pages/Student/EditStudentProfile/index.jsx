import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
} from "react-bootstrap";
import styles from "./EditStudentProfile.module.css"; // Eyni CSS-i istifadə edirik
import defaultAvatar from "/images/avatar-default.svg";
import { useAxiosWithAuth } from "../../../hooks/UseAxiosWithAuth";
import { AuthContext } from "../../../context/AuthContext";

const EditStudentProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [previewImage, setPreviewImage] = useState(defaultAvatar);
  const [imageFile, setImageFile] = useState(null);
  const axiosAuth = useAxiosWithAuth();
  const {user} = useContext(AuthContext)
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Ad boş ola bilməz"),
    lastName: Yup.string().required("Soyad boş ola bilməz"),
    gender: Yup.string().oneOf(["0", "1"], "Zəhmət olmasa cins seçin").required("Cins vacibdir"),
    dob: Yup.date().required("Doğum tarixi vacibdir"),
    address: Yup.string().required("Ünvan vacibdir"),
  });

  const studentId = user.userId
  const fetchUserData = async () => {
    try {
      const res = await axios.get(
        `https://turanapi2-001-site1.jtempurl.com/api/User/GetUserById/${studentId}`
      );
      console.log(res.data)
      if (res.data?.isSuccess) {
        setUserData(res.data.data);
        if (res.data.data.imgUrl) {
          setPreviewImage(res.data.data.imgUrl);
        }
      }
    } catch (error) {
      console.error("Məlumatlar gətirilə bilmədi:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setFieldValue("profileImage", file);

      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("FirstName", values.firstName);
      formData.append("LastName", values.lastName);
      formData.append("Gender", values.gender);
      formData.append("DOB", values.dob);
      formData.append("Address", values.address);
      if (imageFile) {
        formData.append("ProfileImage", imageFile);
      }

      await axiosAuth.put(
        `https://turanapi2-001-site1.jtempurl.com/api/Auth/update-profile`,
        formData
      );

      alert("Profil uğurla yeniləndi!");
      setIsEditMode(false);
      fetchUserData();
    } catch (error) {
      console.error("Xəta:", error);
      alert("Xəta baş verdi!");
    } finally {
      setSubmitting(false);
    }
  };

  if (!userData) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className={styles.editProfileWrapper}>
      <div className="text-center mb-4">
        <div
          className={styles.avatarContainer}
          onClick={() => isEditMode && document.getElementById("profileUpload").click()}
        >
          <img src={previewImage} alt="Profil şəkli" className={styles.avatar} />
          {isEditMode && <div className={styles.overlay}>Şəkli Dəyiş</div>}
        </div>
        <input
          type="file"
          id="profileUpload"
          className="d-none"
          accept="image/*"
          onChange={(e) => handleImageChange(e, () => {})}
        />
      </div>

      <Formik
        enableReinitialize
        initialValues={{
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          gender: userData.gender?.toString() || "",
          dob: userData.dob?.slice(0, 10) || "",
          address: userData.address || "",
          profileImage: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <label>Ad</label>
                {isEditMode ? (
                  <Field name="firstName" className="form-control" />
                ) : (
                  <p className={styles.viewField}>{userData.firstName}</p>
                )}
                <ErrorMessage name="firstName" component="div" className={styles.error} />
              </Col>
              <Col md={6}>
                <label>Soyad</label>
                {isEditMode ? (
                  <Field name="lastName" className="form-control" />
                ) : (
                  <p className={styles.viewField}>{userData.lastName}</p>
                )}
                <ErrorMessage name="lastName" component="div" className={styles.error} />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <label>Cins</label>
                {isEditMode ? (
                  <Field as="select" name="gender" className="form-select">
                    <option value="">Seçin</option>
                    <option value="0">Kişi</option>
                    <option value="1">Qadın</option>
                  </Field>
                ) : (
                  <p className={styles.viewField}>
                    {userData.gender === 0 ? "Kişi" : "Qadın"}
                  </p>
                )}
                <ErrorMessage name="gender" component="div" className={styles.error} />
              </Col>
              <Col md={6}>
                <label>Doğum tarixi</label>
                {isEditMode ? (
                  <Field name="dob" type="date" className="form-control" />
                ) : (
                  <p className={styles.viewField}>{userData.dob?.slice(0, 10)}</p>
                )}
                <ErrorMessage name="dob" component="div" className={styles.error} />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col>
                <label>Ünvan</label>
                {isEditMode ? (
                  <Field name="address" className="form-control" />
                ) : (
                  <p className={styles.viewField}>{userData.address}</p>
                )}
                <ErrorMessage name="address" component="div" className={styles.error} />
              </Col>
            </Row>

            <div className="text-end">
              {isEditMode ? (
                <>
                  <Button variant="secondary" className="me-2" onClick={() => setIsEditMode(false)}>
                    Ləğv et
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    Yadda saxla
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditMode(true)}>Redaktə et</Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EditStudentProfile;
