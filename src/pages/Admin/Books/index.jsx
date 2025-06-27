import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import styles from "./Books.module.css";
import { FaEdit, FaTrash, FaBookOpen, FaFilePdf } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const API_BASE = "https://turansalimli-001-site1.ntempurl.com/api/Book";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    subjectId: "",
    pdfFile: null, // Fayl obyektini saxlayırıq
  });

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_BASE}/GetAllBooks`);
      console.log(response.data)
      setBooks(response.data);
    } catch (err) {
      console.error("Kitablar yüklənmədi:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBookClick = async (book) => {
    try {
      const res = await axios.get(`${API_BASE}/GetById/${book.id}`);
      setSelectedBook(res.data);
      setShowDetailModal(true);
    } catch (err) {
      console.error("Detallar tapılmadı:", err);
    }
  };

  const handleDelete = async (book) => {
    Swal.fire({
      title: `Kitab "${book.name}" silinsin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Bəli, sil!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_BASE}/DeleteBook/${book.id}`);
          fetchBooks();
          Swal.fire("Silindi!", `"${book.name}" kitabı silindi.`, "success");
        } catch (err) {
          console.error("Silinmədi:", err);
        }
      }
    });
  };

  const handleDownload = async (pdfUrl, fileName) => {
    try {
      const response = await fetch(pdfUrl, { mode: "cors" });
      if (!response.ok) throw new Error("Fayl tapılmadı və ya server səhvi!");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || "file.pdf";
      document.body.appendChild(a); // Firefox üçün lazımdır
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Yükləmə xətası:", error);
      alert("Fayl yüklənmədi!");
    }
  };


  const handleEditClick = (book) => {
    setEditForm({
      id: book.id,
      name: book.name,
      subjectId: book.subject?.id || "",
      pdfFile: null, // Faylı boş qoyuruq, lazım olsa yüklənəcək
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setEditForm((prev) => ({ ...prev, pdfFile: e.target.files[0] || null }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", editForm.id);
    formData.append("name", editForm.name);
    formData.append("subjectId", editForm.subjectId);

    if (editForm.pdfFile) {
      formData.append("pdf", editForm.pdfFile);
    }

    try {
      await axios.put(`${API_BASE}/UpdateBook`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchBooks();
      setShowEditModal(false);
      Swal.fire("Uğurlu!", `"${editForm.name}" kitabı yeniləndi.`, "success");
    } catch (err) {
      console.error("Yenilənmədi:", err);
      Swal.fire("Xəta!", "Kitab yenilənmədi, səhifəni yeniləyin və yenidən cəhd edin.", "error");
    }
  };

  return (
    <Container className={styles.container}>
      <h2 className={styles.title}>📚 Kitablar</h2>

      <Row className="g-4">
        {books.map((book) => (
          <Col key={book.id} xs={12} sm={6} md={4} lg={3}>
            <div className={styles.classCard}>
              <div
                className={styles.leftPage}
                onClick={() => handleBookClick(book)}
                style={{ cursor: "pointer" }}
              >
                <div className={styles.classHeader}>
                  <h3 className={styles.className}>{book.name}</h3>
                  <FaBookOpen className={styles.icon} />
                </div>
                <p className={styles.classInfo}>Mövzu: <br /> {book.subject?.name || "Yoxdur"}</p>
                {book.pdf && (
                  <button
                    onClick={() => handleDownload(book.pdf, `${book.name}.pdf`)}
                    className={styles.pdfButton}
                  >
                    <FaFilePdf /> PDF
                  </button>
                )}
              </div>
              <div className={styles.rightPage}>
                <FaEdit
                  size={24}
                  color="#0d6efd"
                  onClick={() => handleEditClick(book)}
                  className={styles.icon}
                  title="Redaktə et"
                />
                <FaTrash
                  size={24}
                  color="#dc3545"
                  onClick={() => handleDelete(book)}
                  className={styles.icon}
                  title="Sil"
                />
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Detal Modal */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBook?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Mövzu:</strong> {selectedBook?.subject?.name || "Yoxdur"}</p>
          {selectedBook?.pdf && (
            <p>
              <strong>PDF:</strong>{" "}
              <a href={selectedBook.pdf} target="_blank" rel="noreferrer">
                PDF linki
              </a>
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Bağla
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Kitabı redaktə et</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3" controlId="formBookName">
              <Form.Label>Kitab adı</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSubjectId">
              <Form.Label>Subject ID</Form.Label>
              <Form.Control
                type="text"
                name="subjectId"
                value={editForm.subjectId}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPdfFile">
              <Form.Label>PDF faylı yüklə</Form.Label>
              <Form.Control
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              <Form.Text className="text-muted">
                Yeni PDF faylı yükləmək istəmirsinizsə, bu sahəni boş saxlayın.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Yenilə
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
