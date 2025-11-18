// QuizTimes.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useAxiosWithAuth } from "../../../hooks/UseAxiosWithAuth";
import Swal from "sweetalert2";

const QuizTimes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("detail");
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const axiosAuth = useAxiosWithAuth();

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const res = await axiosAuth.get(
        "https://turanapi2-001-site1.jtempurl.com/api/Quiz/GetAllQuizzes"
      );
      setQuizzes(res.data);
    } catch (err) {
      console.error("Quiz-lər alınmadı:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjectsAndClasses = async () => {
    try {
      const [subjectsRes, classesRes] = await Promise.all([
        axiosAuth.get("https://turanapi2-001-site1.jtempurl.com/api/Subject/GetAllSubject"),
        axiosAuth.get("https://turanapi2-001-site1.jtempurl.com/api/SchoolClass/GetAllSchoolClass"),
      ]);
      setSubjects(subjectsRes.data);
      setClasses(classesRes.data);
    } catch (err) {
      console.error("Fənn və ya sinifləri almaqda xəta:", err);
    }
  };

  useEffect(() => {
    fetchQuizzes();
    fetchSubjectsAndClasses();
  }, []);

  const handleDetail = async (id, mode = "detail") => {
    try {
      const res = await axiosAuth.get(
        `https://turanapi2-001-site1.jtempurl.com/api/Quiz/GetById/${id}`
      );
      const data = res.data;
      setSelectedQuiz({
        id: data.id,
        subjectId: data.subject.id,
        classId: data.class.id,
        date: new Date(data.date).toISOString().slice(0, 16),
        primary: data.primary,
      });
      setModalMode(mode);
      setShowModal(true);
    } catch (err) {
      console.error("Detail alınmadı:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Əminsiniz?",
      text: "Bu quiz silinəcək!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sil",
      cancelButtonText: "Ləğv et",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosAuth.delete(
          `https://turanapi2-001-site1.jtempurl.com/api/Quiz/DeleteQuiz/${id}`
        );
        Swal.fire("Silindi!", "Quiz uğurla silindi.", "success");
        fetchQuizzes();
      } catch (err) {
        Swal.fire("Xəta!", "Silinmə zamanı xəta baş verdi.", "error");
      }
    }
  };

  const handleSaveEdit = async () => {
    try {
      const payload = {
        id: selectedQuiz.id,
        subjectId: selectedQuiz.subjectId,
        classId: selectedQuiz.classId,
        date: new Date(selectedQuiz.date).toISOString(),
        primary: selectedQuiz.primary,
      };
      await axiosAuth.put(
        "https://turanapi2-001-site1.jtempurl.com/api/Quiz/UpdateQuiz",
        payload
      );
      setShowModal(false);
      fetchQuizzes();
      Swal.fire("Uğurlu!", "Quiz yeniləndi.", "success");
    } catch (err) {
      console.error("Yeniləmə xətası:", err);
      Swal.fire("Xəta!", "Quiz yenilənə bilmədi.", "error");
    }
  };

  return (
    <div className="p-4" style={{ maxWidth: "calc(100vw - 300px)", marginLeft: "300px", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <h3 className="mb-4 text-primary fw-bold">Quiz Vaxtları</h3>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="table-responsive shadow-sm bg-white rounded">
          <Table striped bordered hover responsive className="mb-0">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Fənn</th>
                <th>Sinif</th>
                <th>Tip</th>
                <th>Tarix</th>
                <th>Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.length > 0 ? (
                quizzes.map((quiz, index) => (
                  <tr key={quiz.id}>
                    <td>{index + 1}</td>
                    <td>{quiz.subject?.name || "–"}</td>
                    <td>{quiz.class?.name || "–"}</td>
                    <td>{quiz.primary ? "Böyük Summativ" : "Kiçik Summativ"}</td>
                    <td>{new Date(quiz.date).toLocaleString("az-AZ")}</td>
                    <td>
                      <Button variant="info" size="sm" className="me-2" onClick={() => handleDetail(quiz.id, "detail")}>Bax</Button>
                      <Button variant="warning" size="sm" className="me-2" onClick={() => handleDetail(quiz.id, "edit")}>Redaktə</Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(quiz.id)}>Sil</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">Quiz tapılmadı.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "detail" ? "Quiz Məlumatları" : "Quiz Redaktə Et"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedQuiz && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Fənn</Form.Label>
                <Form.Select
                  disabled={modalMode === "detail"}
                  value={selectedQuiz.subjectId}
                  onChange={(e) => setSelectedQuiz({ ...selectedQuiz, subjectId: e.target.value })}
                >
                  <option value="">Fənn seçin</option>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Sinif</Form.Label>
                <Form.Select
                  disabled={modalMode === "detail"}
                  value={selectedQuiz.classId}
                  onChange={(e) => setSelectedQuiz({ ...selectedQuiz, classId: e.target.value })}
                >
                  <option value="">Sinif seçin</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tarix</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={selectedQuiz.date}
                  readOnly={modalMode === "detail"}
                  onChange={(e) => setSelectedQuiz({ ...selectedQuiz, date: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  label={selectedQuiz.primary ? "Böyük Summativ" : "Kiçik Summativ"}
                  checked={selectedQuiz.primary}
                  disabled={modalMode === "detail"}
                  onChange={(e) => setSelectedQuiz({ ...selectedQuiz, primary: e.target.checked })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        {modalMode === "edit" && (
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Bağla
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Yadda saxla
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default QuizTimes;