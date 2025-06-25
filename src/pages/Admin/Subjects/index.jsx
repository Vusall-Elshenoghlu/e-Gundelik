import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import styles from "./Subjects.module.css";
import { FaBookOpen, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const BASE_URL = "https://turansalimli-001-site1.ntempurl.com/api/Subject";

export default function Subject() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/GetAllSubject`)
      .then((res) => setSubjects(res.data))
      .catch((err) => console.error("Fənləri yükləmək mümkün olmadı:", err));
  }, []);

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setShowDetailModal(true);
  };

  const handleDetailClose = () => {
    setShowDetailModal(false);
    setTimeout(() => {
      document.querySelector("h2")?.focus();
    }, 100);
  };

  const handleEditClick = (subject) => {
    setEditForm({ ...subject });
    setShowEditModal(true);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    setTimeout(() => {
      document.querySelector("h2")?.focus();
    }, 100);
  };

  const handleDelete = (subject) => {
    Swal.fire({
      title: `Fənn "${subject.name}" silinsin?`,
      text: "Bu əməliyyat geri qaytarıla bilməz!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Bəli, sil!",
      cancelButtonText: "Ləğv et",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${BASE_URL}/DeleteSubject`, {
          headers: {
            'Content-Type': 'application/json',
          },
          data: { id: subject.id },
        })
          .then(() => {
            setSubjects((prev) => prev.filter((s) => s.id !== subject.id));
            Swal.fire("Silindi!", `"${subject.name}" silindi.`, "success");
          })
          .catch((err) => {
            console.error("Silinmə zamanı xəta:", err);
            Swal.fire("Xəta!", "Silinmə zamanı problem oldu.", "error");
          });
      }
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${BASE_URL}/UpdateSubject`, editForm)
      .then((res) => {
        setSubjects((prev) =>
          prev.map((s) => (s.id === editForm.id ? res.data : s))
        );
        setShowEditModal(false);
        Swal.fire("Uğurlu!", `"${editForm.name}" fənni yeniləndi.`, "success");
      })
      .catch((err) => {
        console.error("Yeniləmə zamanı xəta:", err);
        Swal.fire("Xəta!", "Yeniləmə zamanı problem oldu.", "error");
      });
  };

  return (
    <Container className={styles.container}>
      <h2 tabIndex="-1" className={styles.title}>📘 Fənlər</h2>

      <Row>
        {subjects.map((subject) => (
          <Col key={subject.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <div className={styles.classCard}>
              <div
                className={styles.classHeader}
                onClick={() => handleSubjectClick(subject)}
                style={{ cursor: "pointer" }}
              >
                <h3 className={styles.className}>{subject.name}</h3>
                <FaBookOpen className={styles.icon} />
              </div>

              <p className={styles.classYear}>
                <strong>ID:</strong> {subject.id.slice(0, 6)}...
              </p>

              <div className="d-flex justify-content-end gap-3 mt-3">
                <FaEdit
                  size={20}
                  color="#0d6efd"
                  style={{ cursor: "pointer" }}
                  title="Redaktə et"
                  onClick={() => handleEditClick(subject)}
                />
                <FaTrash
                  size={20}
                  color="#dc3545"
                  style={{ cursor: "pointer" }}
                  title="Sil"
                  onClick={() => handleDelete(subject)}
                />
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Detal Modalı */}
      <Modal show={showDetailModal} onHide={handleDetailClose} centered unmountOnClose>
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalTitle}>{selectedSubject?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <p>
            <span className={styles.modalLabel}>ID:</span>
            {selectedSubject?.id}
          </p>
          <p>
            <span className={styles.modalLabel}>Açıqlama:</span>
            {selectedSubject?.description || "Yoxdur"}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDetailClose}>Bağla</Button>
        </Modal.Footer>
      </Modal>

      {/* Redaktə Modalı */}
      <Modal show={showEditModal} onHide={handleEditClose} centered unmountOnClose>
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalTitle}>Fənni redaktə et</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Fənn adı</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Açıqlama</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={editForm.description || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Yenilə
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
