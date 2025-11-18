// StudentQuizTimes.jsx
import React, { useEffect, useState } from "react";
import { Table, Spinner, Button, Modal, Form, Container, Row, Col } from "react-bootstrap";
import { useAxiosWithAuth } from "../../../hooks/UseAxiosWithAuth";

const ParentQuizTimes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const axiosAuth = useAxiosWithAuth();

  useEffect(() => {
    fetchQuizzes();
    fetchSubjectsAndClasses();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const res = await axiosAuth.get("https://turanapi2-001-site1.jtempurl.com/api/Quiz/GetAllQuizzes");
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

  const handleDetail = async (id) => {
    try {
      const res = await axiosAuth.get(`https://turanapi2-001-site1.jtempurl.com/api/Quiz/GetById/${id}`);
      const data = res.data;
      setSelectedQuiz({
        id: data.id,
        subjectId: data.subject.id,
        classId: data.class.id,
        date: new Date(data.date).toISOString().slice(0, 16),
        primary: data.primary,
      });
      setShowModal(true);
    } catch (err) {
      console.error("Detail alınmadı:", err);
    }
  };

  return (
    <div className="px-3 py-4" style={{ marginLeft: "300px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Container fluid>
        <Row>
          <Col>
            <h3 className="mb-4 text-primary fw-bold">Quiz Vaxtları</h3>
          </Col>
        </Row>

        {loading ? (
          <Row className="justify-content-center align-items-center" style={{ height: "50vh" }}>
            <Col xs="auto">
              <Spinner animation="border" variant="primary" />
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <div className="table-responsive shadow-sm bg-white rounded">
                <Table striped bordered hover responsive className="mb-0">
                  <thead className="table-primary">
                    <tr>
                      <th>#</th>
                      <th>Fənn</th>
                      <th>Sinif</th>
                      <th>Tip</th>
                      <th>Tarix</th>
                      <th>Əməliyyat</th>
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
                            <Button variant="info" size="sm" onClick={() => handleDetail(quiz.id)}>
                              Bax
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center text-muted py-4">
                          Quiz tapılmadı.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        )}
      </Container>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>Quiz Məlumatları</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedQuiz && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Fənn</Form.Label>
                <Form.Select value={selectedQuiz.subjectId} disabled>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Sinif</Form.Label>
                <Form.Select value={selectedQuiz.classId} disabled>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tarix</Form.Label>
                <Form.Control type="datetime-local" value={selectedQuiz.date} readOnly />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  label={selectedQuiz.primary ? "Böyük Summativ" : "Kiçik Summativ"}
                  checked={selectedQuiz.primary}
                  disabled
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ParentQuizTimes;
