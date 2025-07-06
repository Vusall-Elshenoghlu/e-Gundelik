import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import styles from "./Classes.module.css";
import Select from "react-select";
import {
  FaChalkboardTeacher,
  FaUserFriends,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const BASE_URL = "https://turansalimli-001-site1.ntempurl.com/api/SchoolClass";

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    subjectIds: [],
    bossTeacherId: "",
  });
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/GetAllSchoolClass`)
      .then((res) => setClasses(res.data))
      .catch((err) => console.error("Sinifləri yükləmək mümkün olmadı:", err));

    const fetchMetaData = async () => {
      try {
        const [subjectRes, teacherRes] = await Promise.all([
          axios.get("https://turansalimli-001-site1.ntempurl.com/api/Subject/GetAllSubject"),
          axios.get("https://turansalimli-001-site1.ntempurl.com/api/User/teachers"),
        ]);
        setSubjects(subjectRes.data.map((s) => ({ label: s.name, value: s.id })));
        setTeachers(teacherRes.data?.data || []);
      } catch (err) {
        console.error("Fənn və müəllimləri yükləmək mümkün olmadı:", err);
      }
    };

    fetchMetaData();
  }, []);

  const handleClassClick = (cls) => {
    setSelectedClass(cls);
    setShowDetailModal(true);
  };

  const handleDelete = (cls) => {
    Swal.fire({
      title: `Sinif \"${cls.name}\" silinsin?`,
      text: "Bu əməliyyat geri alınmayacaq!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Bəli, sil!",
      cancelButtonText: "Ləğv et",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BASE_URL}/DeleteSchoolClass/${cls.id}`)
          .then(() => {
            setClasses((prev) => prev.filter((c) => c.id !== cls.id));
            Swal.fire("Silindi!", `\"${cls.name}\" sinifi silindi.`, "success");
          })
          .catch((err) => {
            console.error("Silinmə zamanı xəta:", err);
            Swal.fire("Xəta!", "Silinmə zamanı problem oldu.", "error");
          });
      }
    });
  };

  const handleEditClick = (cls) => {
    setEditForm({
      id: cls.id,
      name: cls.name,
      subjectIds: cls.subjectIds || [],
      bossTeacherId: cls.bossTeacherId || "",
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${BASE_URL}/UpdateSchoolClass`, editForm)
      .then((res) => {
        setClasses((prev) =>
          prev.map((cls) => (cls.id === editForm.id ? res.data : cls))
        );
        setShowEditModal(false);
        Swal.fire("Uğurlu!", `\"${editForm.name}\" sinifi yeniləndi.`, "success");
      })
      .catch((err) => {
        console.error("Yeniləmə zamanı xəta:", err);
        Swal.fire("Xəta!", "Yeniləmə zamanı problem oldu.", "error");
      });
  };

  const getTeacherName = (id) => {
    const found = teachers.find(t => t.id === id);
    return found ? `${found.firstName} ${found.lastName}` : "-";
  };

  const getSubjectNames = (ids) => {
    return subjects
      .filter(sub => ids?.includes(sub.value))
      .map(sub => sub.label)
      .join(", ");
  };

  return (
    <Container className={styles.container}>
      <h2 className={styles.title}>📚 Siniflər</h2>

      <Row>
        {classes.map((cls) => (
          <Col key={cls.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <div className={styles.classCard}>
              <div
                className={styles.classHeader}
                onClick={() => handleClassClick(cls)}
                style={{ cursor: "pointer" }}
              >
                <h3 className={styles.className}>{cls.name}</h3>
                <FaChalkboardTeacher className={styles.icon} />
              </div>
              <p className={styles.classInfo}>
                <FaUserFriends className={styles.icon} /> {cls.studentCount} şagird
              </p>
              <div className="d-flex justify-content-end gap-3 mt-3">
                <FaEdit
                  size={20}
                  color="#0d6efd"
                  style={{ cursor: "pointer" }}
                  title="Redaktə et"
                  onClick={() => handleEditClick(cls)}
                />
                <FaTrash
                  size={20}
                  color="#dc3545"
                  style={{ cursor: "pointer" }}
                  title="Sil"
                  onClick={() => handleDelete(cls)}
                />
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalTitle}>{selectedClass?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <p><span className={styles.modalLabel}>Sinif rəhbəri:</span> {getTeacherName(selectedClass?.bossTeacherId)}</p>
          <p><span className={styles.modalLabel}>Şagird sayı:</span> {selectedClass?.studentCount}</p>
          <p><span className={styles.modalLabel}>Fənnlər:</span> {getSubjectNames(selectedClass?.subjectIds)}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowDetailModal(false)}>Bağla</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalTitle}>Sinifi redaktə et</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Sinif Adı</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fənnlər</Form.Label>
              <Select
                isMulti
                name="subjectIds"
                options={subjects}
                value={subjects.filter(sub => editForm.subjectIds.includes(sub.value))}
                onChange={(selected) =>
                  setEditForm(prev => ({
                    ...prev,
                    subjectIds: selected.map(s => s.value),
                  }))
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sinif Rəhbəri</Form.Label>
              <Form.Select
                name="bossTeacherId"
                value={editForm.bossTeacherId}
                onChange={handleEditChange}
                required
              >
                <option value="">Seçin...</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.firstName} {t.lastName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button type="submit" variant="primary">Yenilə</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
