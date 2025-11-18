
import { useEffect, useState } from "react"
import { Modal, Button, Container, Row, Col, Card, Badge, Form } from "react-bootstrap"
import styles from "./Books.module.css"
import { FaEdit, FaTrash, FaBookOpen, FaFilePdf, FaEye, FaPlus } from "react-icons/fa"
import Swal from "sweetalert2"
import axios from "axios"
import { Link, useNavigate } from "react-router"

const API_BASE = "https://turanapi2-001-site1.jtempurl.com/api/Book"

export default function Books() {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [subjects, setSubjects] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")

  const axiosAuth = axios.create()

  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    subjectId: "",
    pdfFile: null,
  })

  const fetchBooks = async () => {
    try {
      const response = await axiosAuth.get(`${API_BASE}/GetAllBooks`);
      setBooks(response.data);
    } catch (err) {
      console.error("Kitablar yüklənmədi:", err)
    }
  }

  const fetchSubjects = async () => {
    try {
      const res = await axiosAuth.get("https://turanapi2-001-site1.jtempurl.com/api/Subject/GetAllSubject");
      setSubjects(res.data);
    } catch (err) {
      console.error("Mövzular yüklənmədi:", err)
    }
  }

  useEffect(() => {
    fetchSubjects()
    fetchBooks()
  }, [])

  const handleBookClick = (book) => {
    setSelectedBook(book)
    setShowDetailModal(true)
  }

  const handleDelete = async (book) => {
    Swal.fire({
      title: `Kitab "${book.name}" silinsin?`,
      text: "Bu əməliyyat geri qaytarıla bilməz!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Bəli, sil!",
      cancelButtonText: "Ləğv et",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosAuth.delete(`${API_BASE}/DeleteBook/${book.id}`);
          setBooks(books.filter((b) => b.id !== book.id))
          Swal.fire("Silindi!", `"${book.name}" kitabı silindi.`, "success")
        } catch (err) {
          console.error("Silinmədi:", err)
          Swal.fire("Xəta!", "Kitab silinmədi.", "error")
        }
      }
    })
  }

  const handleEditClick = (book) => {
    setEditForm({
      id: book.id,
      name: book.name,
      subjectId: book.subject?.id || "",
      pdfFile: null,
    })
    setShowEditModal(true)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null
    setEditForm((prev) => ({ ...prev, pdfFile: file }))
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("id", editForm.id)
    formData.append("name", editForm.name)
    formData.append("subjectId", editForm.subjectId)
    if (editForm.pdfFile) {
      formData.append("pdf", editForm.pdfFile)
    }

    try {
      await axiosAuth.put(`${API_BASE}/UpdateBook`, formData)
      fetchBooks()
      setShowEditModal(false)
      Swal.fire("Uğurlu!", `"${editForm.name}" kitabı yeniləndi.`, "success")
    } catch (err) {
      console.error("Yenilənmədi:", err)
      Swal.fire("Xəta!", "Kitab yenilənmədi.", "error")
    }
  }

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.subject?.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === "" || book.subject?.id === selectedSubject
    return matchesSearch && matchesSubject
  })

  return (
    <Container fluid className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <FaBookOpen className={styles.titleIcon} />
          <h1 className={styles.title}>Kitab Kitabxanası</h1>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchSection}>
            <Form.Control
              type="text"
              placeholder="Kitab və ya mövzu axtar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <Form.Select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Bütün mövzular</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </Form.Select>
          </div>

          <Link to={"/admin-panel/add-book"}>
            <Button variant="primary" className={styles.addButton}>
              <FaPlus className="me-2" />
              Yeni Kitab
            </Button>
          </Link>
        </div>
      </div>

      <div className={styles.statsSection}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{books.length}</div>
          <div className={styles.statLabel}>Ümumi Kitab</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{subjects.length}</div>
          <div className={styles.statLabel}>Mövzu</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{filteredBooks.length}</div>
          <div className={styles.statLabel}>Filtrlənmiş</div>
        </div>
      </div>

      <Row className="g-4">
        {filteredBooks.map((book) => (
          <Col key={book.id} xs={12} sm={6} md={4} lg={3}>
            <Card className={styles.bookCard}>
              <div className={styles.bookCover}>
                <div className={styles.bookSpine}></div>
                <div className={styles.bookPages}>
                  <div className={styles.bookPage}></div>
                  <div className={styles.bookPage}></div>
                  <div className={styles.bookPage}></div>
                </div>
                <div className={styles.bookContent}>
                  <div className={styles.bookIcon}>
                    <FaBookOpen />
                  </div>
                  <h5 className={styles.bookTitle}>{book.name}</h5>
                  <Badge bg="secondary" className={styles.subjectBadge}>
                    {book.subject?.name || "Yoxdur"}
                  </Badge>
                </div>
              </div>

              <Card.Body className={styles.cardBody}>
                <div className={styles.actionButtons}>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleBookClick(book)}
                    className={styles.actionBtn}
                  >
                    <FaEye />
                  </Button>

                  {book.pdf && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => window.open(book.pdf, "_blank")}
                      className={styles.actionBtn}
                    >
                      <FaFilePdf />
                    </Button>
                  )}

                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => handleEditClick(book)}
                    className={styles.actionBtn}
                  >
                    <FaEdit />
                  </Button>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(book)}
                    className={styles.actionBtn}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredBooks.length === 0 && (
        <div className={styles.emptyState}>
          <FaBookOpen className={styles.emptyIcon} />
          <h3>Kitab tapılmadı</h3>
          <p>Axtarış kriteriyalarınıza uyğun kitab yoxdur.</p>
        </div>
      )}

      {/* Detail Modal */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <FaBookOpen className="me-2" />
            {selectedBook?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Mövzu:</strong> {selectedBook?.subject?.name || "Yoxdur"}</p>
          {selectedBook?.pdf && (
            <Button variant="danger" onClick={() => window.open(selectedBook.pdf, "_blank")}>
              <FaFilePdf className="me-2" />
              PDF-i aç
            </Button>
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
          <Modal.Title>
            <FaEdit className="me-2" />
            Kitabı redaktə et
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Kitab adı</Form.Label>
              <Form.Control type="text" name="name" value={editForm.name} onChange={handleEditChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mövzu</Form.Label>
              <Form.Select name="subjectId" value={editForm.subjectId} onChange={handleEditChange} required>
                <option value="">Mövzu seçin</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>PDF faylı yüklə</Form.Label>
              <Form.Control type="file" accept="application/pdf" onChange={handleFileChange} />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Yenilə
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>


    </Container>
  )
}
