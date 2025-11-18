import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select"; // Yeni əlavə
import { Button, Form as BootstrapForm, Container, Card } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useAxiosWithAuth } from "../../../hooks/UseAxiosWithAuth";

const AddClass = () => {
  const [subjects, setSubjects] = useState([
    {
      "id": "27b9fe57-2f35-4b97-3a52-08ddb182fdf4",
      "name": "Cografiya"
    },
    {
      "id": "149e638f-adb0-464b-df7b-08ddb9729ce1",
      "name": "Riyaziyyat "
    },
    {
      "id": "2d5116ee-622a-4187-c880-08ddba28c1e4",
      "name": "Tarix"
    },
    {
      "id": "bba9177e-b6a3-4237-da5d-08ddba28deb6",
      "name": "Edebiyyat"
    },
    {
      "id": "8b6c9994-e5bf-42ce-7c3f-08ddbb1f03e5",
      "name": "Azerbaycan Dili"
    },
    {
      "id": "04f49674-4f42-4449-4f63-08ddbcb568ec",
      "name": "Ingilis Dili"
    }
  ]);
  const [teachers, setTeachers] = useState([]);
  const axiosAuth = useAxiosWithAuth()
  const initialValues = {
    name: "",
    subjectIds: [],
    classTeacher: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Sinif adı ən azı 2 simvol olmalıdır")
      .max(50, "Sinif adı çox uzun oldu")
      .required("Sinif adı mütləqdir"),
    subjectIds: Yup.array().min(1, "Ən azı bir fənn seçilməlidir"),
    classTeacher: Yup.string().required("Sinif rəhbəri seçilməlidir"),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectsRes, teachersRes] = await Promise.all([
          axiosAuth.get("https://turanapi2-001-site1.jtempurl.com/api/Subject/GetAllSubject"),
          axios.get("https://turanapi2-001-site1.jtempurl.com/api/User/GetAllTeachers/teachers"),
        ]);
        console.log(teachersRes)
        console.log(subjectsRes.data)
        setSubjects(
          (subjectsRes.data || []).map((s) => ({ label: s.name, value: s.id }))
        );
        setTeachers(teachersRes.data?.data || []);
      } catch (error) {
        console.error("Verilər yüklənərkən xəta:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    const payload = {
      name: values.name,
      subjectIds: values.subjectIds.map((s) => s.value),
      bossTeacherId: values.classTeacher,
    };

    try {
      const response = await axios.post(
        "https://turanapi2-001-site1.jtempurl.com/api/SchoolClass/CreateSchoolClass",
        payload
      );
      console.log(response.data.isSuccess)
      if (response.data.statusCode === 200) {
        setStatus({ success: "Sinif uğurla əlavə olundu!" });
        Swal.fire("Sinif uğurla əlavə olundu!",)
        resetForm();
      } else {
        setStatus({ error: response.data.message || "Xəta baş verdi" });
      }
    } catch (error) {
      setStatus({ error: error.response?.data?.message || "Server xətası" });
    }

    setSubmitting(false);
  };

  return (
    <Container
      style={{ width: "1230px", height: "100vh", backgroundColor: "rgba(234, 228, 228, 0.85)" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Card className="shadow-sm" style={{ width: "800px", height: "auto", padding: "5%" }}>
        <Card.Body>
          <h3 className="mb-4">Yeni Sinif Əlavə Et</h3>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting, status, setFieldValue, values }) => (
              <Form>
                <BootstrapForm.Group className="mb-3" controlId="formName">
                  <BootstrapForm.Label>Sinif Adı</BootstrapForm.Label>
                  <Field name="name" type="text" placeholder="Sinif adını daxil edin" className="form-control" />
                  <ErrorMessage name="name" component="div" className="text-danger mt-1" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3" controlId="formSubjects">
                  <BootstrapForm.Label>Fənnləri seçin</BootstrapForm.Label>
                  <Select
                    isMulti
                    name="subjectIds"
                    options={subjects}
                    value={values.subjectIds}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(selectedOptions) => setFieldValue("subjectIds", selectedOptions)}
                    placeholder="Fənn seçin..."
                  />
                  <ErrorMessage name="subjectIds" component="div" className="text-danger mt-1" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3" controlId="formClassTeacher">
                  <BootstrapForm.Label>Sinif Rəhbəri Seçin</BootstrapForm.Label>
                  <Field as="select" name="classTeacher" className="form-select">
                    <option value="">Rəhbər seçin...</option>
                    {teachers.map((teacher, index) => (
                      <option key={index} value={teacher.id || index}>
                        {teacher.firstName} {teacher.lastName}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="classTeacher" component="div" className="text-danger mt-1" />
                </BootstrapForm.Group>

                {status?.error && <div className="alert alert-danger">{status.error}</div>}
                {status?.success && <div className="alert alert-success">{status.success}</div>}

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
