import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const TeacherStudents = () => {
  const [lessons, setLessons] = useState([]);
  const [selectedLessonId, setSelectedLessonId] = useState("");
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [result, setResult] = useState("");
  const [feedback, setFeedback] = useState("");

  // Dərsləri çəkmək
  useEffect(() => {
    axios
      .get("https://turansalimli-001-site1.ntempurl.com/api/Lesson/GetAllLessons")
      .then((res) => {
        setLessons(res.data);
      })
      .catch((err) => {
        console.error("Dərslər gətirilərkən xəta:", err);
      });
  }, []);

  // Tələbələri çəkmək (hal-hazırda dəyişmir, lazım olsa lessonId-ə görə dəyişdirə bilərik)
  useEffect(() => {
    axios
      .get("https://turansalimli-001-site1.ntempurl.com/api/User/GetAllStudents/students")
      .then((res) => {
        setStudents(res.data.data);
      })
      .catch((err) => {
        console.error("Tələbələr çəkilərkən xəta:", err);
      });
  }, []);

  const handleLessonChange = (e) => {
    setSelectedLessonId(e.target.value);
  };

  const handleOpenModal = (student) => {
    if (!selectedLessonId) {
      Swal.fire("Xəta", "Zəhmət olmasa dərs seçin", "warning");
      return;
    }
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setResult("");
    setFeedback("");
    setSelectedStudent(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedLessonId || !selectedStudent?.id) {
      Swal.fire("Xəta", "lessonId və ya studentId tapılmadı", "error");
      return;
    }

    const payload = {
      lessonId: selectedLessonId,
      studentProgress: [
        {
          studentId: selectedStudent.id,
          lessonId: selectedLessonId,
          result: Number(result),
          feedback: feedback,
        },
      ],
    };

    axios
      .post("https://turansalimli-001-site1.ntempurl.com/api/Lesson/AddStudentProgress", payload)
      .then(() => {
        Swal.fire("Uğurlu", "Qiymət əlavə olundu", "success");
        handleCloseModal();
      })
      .catch((err) => {
        console.error("POST error:", err);
        Swal.fire("Xəta", "Əlavə olunmadı", "error");
      });
  };

  return (
    <div className="p-4" style={{ maxWidth: "calc(100vw - 300px)", marginLeft: "300px", minHeight: "100vh", backgroundColor: "#f9fafb", boxSizing: "border-box" }}>
      <h3 className="mb-4 text-primary fw-bold" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        Tələbə Siyahısı
      </h3>

      {/* Select for Lessons */}
      <Form.Group className="mb-4" style={{ maxWidth: "400px" }}>
        <Form.Label>Dərs seçin</Form.Label>
        <Form.Select value={selectedLessonId} onChange={handleLessonChange} aria-label="Dərs seçin">
          <option value="">-- Dərs seçin --</option>
          {lessons.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.title} ({new Date(lesson.date).toLocaleDateString()})
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <div className="table-responsive shadow-sm rounded bg-white">
        <Table striped bordered hover responsive className="mb-0" style={{ minWidth: "700px" }}>
          <thead className="table-primary">
            <tr>
              <th>Ad</th>
              <th>Soyad</th>
              <th>Doğum Tarixi</th>
              <th>Ünvan</th>
              <th style={{ minWidth: "130px" }}>Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{new Date(student.dob).toLocaleDateString()}</td>
                  <td>{student.address}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" onClick={() => handleOpenModal(student)}>
                      Qiymətləndir
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-muted py-4">
                  Tələbə tapılmadı.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Qiymət və Feedback -{" "}
            {selectedStudent ? `${selectedStudent.firstName} ${selectedStudent.lastName}` : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formResult">
              <Form.Label>Qiymət (0-100)</Form.Label>
              <Form.Control
                type="number"
                value={result}
                onChange={(e) => setResult(e.target.value)}
                required
                min={0}
                max={100}
                placeholder="Qiyməti daxil edin"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFeedback">
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Şərh yazın..."
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCloseModal} className="me-2">
                İmtina
              </Button>
              <Button variant="primary" type="submit">
                Göndər
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TeacherStudents;
