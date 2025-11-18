// LessonList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Spinner,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewLesson = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [detailData, setDetailData] = useState(null);

  const fetchLessons = async () => {
    try {
      const res = await axios.get(
        "https://turanapi2-001-site1.jtempurl.com/api/Lesson/GetAllLessons"
      );
      setLessons(res.data);
    } catch (err) {
      console.error("Dərslər yüklənmədi", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleEditClick = (lesson) => {
    setSelectedLesson({ ...lesson });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Əminsiniz?",
      text: "Bu dərsi silmək istədiyinizə əminsiniz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Bəli, sil!",
      cancelButtonText: "Xeyr",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://turanapi2-001-site1.jtempurl.com/api/Lesson/DeleteLesson/${id}`
        );
        fetchLessons();
        Swal.fire("Silindi!", "Dərs uğurla silindi.", "success");
      } catch (err) {
        Swal.fire("Xəta", "Silinmə zamanı xəta baş verdi", "error");
      }
    }
  };

  const handleSaveChanges = async () => {
    try {
      const { id, title, task, teacherId, classId, subject } = selectedLesson;
      await axios.put(
        `https://turanapi2-001-site1.jtempurl.com/api/Lesson/UpdateLesson/${id}`,
        {
          id,
          title,
          task,
          teacherId,
          classId,
          subjectId: subject.id,
        }
      );
      setShowModal(false);
      fetchLessons();
    } catch (err) {
      Swal.fire("Xəta", "Yenilənmə zamanı xəta baş verdi", "error");
    }
  };

  const handleDetail = async (id) => {
    try {
      const res = await axios.get(
        `https://turanapi2-001-site1.jtempurl.com/api/Lesson/GetById/${id}`
      );
      setDetailData(res.data);
      Swal.fire({
        title: res.data.title,
        html: `
          <b>Tarix:</b> ${new Date(res.data.date).toLocaleString()}<br/>
          <b>Fənn:</b> ${res.data.subject.name}<br/>
          <b>Sinif ID:</b> ${res.data.classId}<br/>
          <b>Task:</b> ${res.data.task || "Yoxdur"}
        `,
        icon: "info",
      });
    } catch (err) {
      Swal.fire("Xəta", "Detalları gətirərkən xəta baş verdi", "error");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col lg={{ span: 10, offset: 1 }} style={{marginLeft:"260px"}}>
          <Card className="p-4 shadow">
            <h3 className="mb-4 text-center">Bütün Dərslər</h3>
            <Table striped bordered responsive hover>
              <thead>
                <tr>
                  <th>Başlıq</th>
                  <th>Tarix</th>
                  <th>Fənn</th>
                  <th>Task</th>
                  <th>Əməliyyatlar</th>
                </tr>
              </thead>
              <tbody>
                {lessons.map((lesson) => (
                  <tr key={lesson.id}>
                    <td>{lesson.title}</td>
                    <td>{new Date(lesson.date).toLocaleString()}</td>
                    <td>{lesson.subject?.name}</td>
                    <td>{lesson.task}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => handleEditClick(lesson)}
                        >
                          Redaktə
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleDetail(lesson.id)}
                        >
                          Detal
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(lesson.id)}
                        >
                          Sil
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Dərsi Redaktə Et</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLesson && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Başlıq</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedLesson.title}
                  onChange={(e) =>
                    setSelectedLesson({
                      ...selectedLesson,
                      title: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Task</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedLesson.task}
                  onChange={(e) =>
                    setSelectedLesson({
                      ...selectedLesson,
                      task: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Bağla
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Yadda saxla
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ViewLesson;
