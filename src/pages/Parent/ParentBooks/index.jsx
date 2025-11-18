import React, { useEffect, useState } from "react";
import { Modal, Container, Row, Col, Button } from "react-bootstrap";
import styles from "./ParentBooks.module.css";
import { FaBookOpen, FaFilePdf } from "react-icons/fa";
import axios from "axios";
const API_BASE = "https://turanapi2-001-site1.jtempurl.com/api/Book";

export default function ParentBooks() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_BASE}/GetAllBooks`);
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
                <p className={styles.classInfo}>
                  Mövzu: <br /> {book.subject?.name || "Yoxdur"}
                </p>
                {book.pdf && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(book.pdf, "_blank");
                    }}
                    className={styles.pdfButton}
                  >
                    <FaFilePdf /> PDF
                  </button>
                )}
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
    </Container>
  );
}
