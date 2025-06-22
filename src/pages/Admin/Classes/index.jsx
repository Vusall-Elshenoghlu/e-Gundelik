import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import styles from "./Classes.module.css";
import {
  FaChalkboardTeacher,
  FaUserFriends,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

// Backend API URL (öz backendinə uyğun dəyiş)
const BASE_URL = 'https://turansalimli-001-site1.ntempurl.com/api/SchoolClass/GetAllSchoolClass';

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    year: "",
    teacher: "",
    studentCount: "",
  });

  // 📥 Sinifləri yüklə
  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((res) => setClasses(res.data))
      .catch((err) => console.error("Sinifləri yükləmək mümkün olmadı:", err));
  }, []);

  const handleClassClick = (cls) => {
    setSelectedClass(cls);
    setShowDetailModal(true);
  };

  const handleDelete = (cls) => {
    Swal.fire({
      title: `Sinif "${cls.name}" silinsin?`,
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
          .delete(`${BASE_URL}/${cls.id}`)
          .then(() => {
            setClasses((prev) => prev.filter((c) => c.id !== cls.id));
            Swal.fire("Silindi!", `"${cls.name}" sinifi silindi.`, "success");
          })
          .catch((err) => {
            console.error("Silinmə zamanı xəta:", err);
            Swal.fire("Xəta!", "Silinmə zamanı problem oldu.", "error");
          });
      }
    });
  };

  const handleEditClick = (cls) => {
    setEditForm({ ...cls });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${BASE_URL}/${editForm.id}`, editForm)
      .then((res) => {
        setClasses((prev) =>
          prev.map((cls) => (cls.id === editForm.id ? res.data : cls))
        );
        setShowEditModal(false);
        Swal.fire("Uğurlu!", `"${editForm.name}" sinifi yeniləndi.`, "success");
      })
      .catch((err) => {
        console.error("Yeniləmə zamanı xəta:", err);
        Swal.fire("Xəta!", "Yeniləmə zamanı problem oldu.", "error");
      });
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

              <p className={styles.classYear}>{cls.year}</p>
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

      {/* Detal Modal */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalTitle}>{selectedClass?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <p><span className={styles.modalLabel}>Sinif rəhbəri:</span>{selectedClass?.teacher}</p>
          <p><span className={styles.modalLabel}>Şagird sayı:</span>{selectedClass?.studentCount}</p>
          <p><span className={styles.modalLabel}>Tədris ili:</span>{selectedClass?.year}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowDetailModal(false)}>Bağla</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalTitle}>Sinifi redaktə et</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Sinif adı</Form.Label>
              <Form.Control type="text" name="name" value={editForm.name} onChange={handleEditChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formYear">
              <Form.Label>Tədris ili</Form.Label>
              <Form.Control type="text" name="year" value={editForm.year} onChange={handleEditChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTeacher">
              <Form.Label>Sinif rəhbəri</Form.Label>
              <Form.Control type="text" name="teacher" value={editForm.teacher} onChange={handleEditChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStudentCount">
              <Form.Label>Şagird sayı</Form.Label>
              <Form.Control type="number" name="studentCount" value={editForm.studentCount} onChange={handleEditChange} required min={0} />
            </Form.Group>
            <Button variant="primary" type="submit">Yenilə</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
