import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Modal, Button, Card, Container, Row, Col, Spinner, Badge } from "react-bootstrap"
import styles from "./StudentLessons.module.css"
import { AuthContext } from "../../../context/AuthContext"

const StudentLessons = () => {
  const [lessons, setLessons] = useState([])
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [progress, setProgress] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [progressLoading, setProgressLoading] = useState(false)
  const { user } = useContext(AuthContext)
  const studentId = user.userId

  useEffect(() => {
    setLoading(true)
    axios
      .get("https://turansalimli-001-site1.ntempurl.com/api/Lesson/GetAllLessons")
      .then((res) => {
        setLessons(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson)
    setProgressLoading(true)
    axios
      .get("https://turansalimli-001-site1.ntempurl.com/api/Lesson/GetStudentProgress", {
        params: {
          lessonId: lesson.id,
          studentId: studentId,
        },
      })
      .then((res) => {
        setProgress(res.data)
        setProgressLoading(false)
        setShowModal(true)
      })
      .catch((err) => {
        setProgress(null)
        setProgressLoading(false)
        setShowModal(true)
        console.error(err)
      })
  }

  if (loading) {
    return (
      <Container className={styles.container}>
        <div className={styles.loadingContainer}>
          <Spinner animation="border" variant="primary" />
          <p className={styles.loadingText}>Dərslər yüklənir...</p>
        </div>
      </Container>
    )
  }

  return (
    <Container className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dərslər</h1>
        <p className={styles.subtitle}>Qiymətinizi görmək üçün dərsə klik edin</p>
        <div className={styles.divider}></div>
      </div>

      {lessons.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📚</div>
          <h3>Hələ dərs əlavə olunmayıb</h3>
          <p>Dərslər əlavə olunduqda burada görünəcək</p>
        </div>
      ) : (
        <Row className={styles.lessonsGrid}>
          {lessons.map((lesson) => (
            <Col key={lesson.id} xs={12} sm={6} lg={4} xl={3} className="mb-4">
              <Card className={styles.lessonCard} onClick={() => handleLessonClick(lesson)}>
                <Card.Body className={styles.cardBody} style={{ position: "relative" }}>
                  <div className={styles.cardHeader}>
                    <Card.Title className={styles.cardTitle}>{lesson.title}</Card.Title>
                    <Badge bg="light" text="dark" className={styles.dateBadge}>
                      {new Date(lesson.date).toLocaleDateString("az-AZ")}
                    </Badge>
                  </div>

                  {/* 📹 Video icon əlavə olunur */}
                  {lesson.videoUrl && (
                    <div
                      className={styles.videoIcon}
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(lesson.videoUrl, "_blank")
                      }}
                      title="Videoya bax"
                    >
                      📹
                    </div>
                  )}

                  <div className={styles.cardContent}>
                    <div className={styles.subjectInfo}>
                      <span className={styles.subjectLabel}>Fənn:</span>
                      <span className={styles.subjectName}>{lesson.subject?.name}</span>
                    </div>

                    <div className={styles.taskInfo}>
                      <span className={styles.taskLabel}>Tapşırıq:</span>
                      <p className={styles.taskText}>{lesson.task}</p>
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <Button variant="primary" className={styles.viewButton} size="sm">
                      <span>Dərsə bax</span>
                      <i className={styles.arrow}>→</i>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered className={styles.progressModal}>
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title className={styles.modalTitle}>{selectedLesson?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          {progressLoading ? (
            <div className={styles.modalLoading}>
              <Spinner animation="border" size="sm" />
              <span>Qiymət yüklənir...</span>
            </div>
          ) : progress ? (
            <div className={styles.progressInfo}>
              <div className={styles.gradeSection}>
                <div className={styles.gradeLabel}>Qiymət</div>
                <div className={styles.gradeValue}>{progress.data.result}</div>
              </div>
              <div className={styles.feedbackSection}>
                <div className={styles.feedbackLabel}>Feedback</div>
                <div className={styles.feedbackText}>{progress.data.feedback}</div>
              </div>
            </div>
          ) : (
            <div className={styles.noProgress}>
              <div className={styles.noProgressIcon}>📝</div>
              <h5>Qiymət əlavə olunmayıb</h5>
              <p>Bu dərs üçün qiymət hələ əlavə olunmayıb.</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)} className={styles.closeButton}>
            Bağla
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default StudentLessons
