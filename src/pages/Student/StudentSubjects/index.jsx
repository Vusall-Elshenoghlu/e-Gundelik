import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import styles from "./StudentSubjects.module.css";
import { FaBookOpen, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { useAxiosWithAuth } from "../../../hooks/UseAxiosWithAuth";

const BASE_URL = "https://turanapi2-001-site1.jtempurl.com/api/Subject";

export default function StudentSubject() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const axiosAuth = useAxiosWithAuth()
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    description: "",
  });


  const fetshSubjects = async () => {
    try {
      const response = await axiosAuth.get(`${BASE_URL}/GetAllSubject`)
      console.log(response.data)
      setSubjects(response.data)
    } catch (err) {
      console.error("Fenler yüklənmədi:", err);
    }
  }
  useEffect(() => {
    fetshSubjects()
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
                <strong>ID:</strong> {subject.id ? subject.id.slice(0, 6) + "..." : "Yoxdur"}
              </p>
              
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

    
    </Container>
  );
}
