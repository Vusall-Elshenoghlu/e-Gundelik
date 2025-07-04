import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Card, Spinner } from "react-bootstrap";

const ViewLesson = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`http://turansalimli-001-site1.ntempurl.com/api/Lesson/${id}`);
        setLesson(response.data);
      } catch (err) {
        console.error("Dərs yüklənmədi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!lesson) {
    return <div className="text-center mt-5 text-danger">Dərs tapılmadı.</div>;
  }

  return (
    <Container className="mt-5">
      <Card className="p-4">
        <h3 className="mb-4 text-center">{lesson.title}</h3>
        <p><strong>Tarix:</strong> {new Date(lesson.date).toLocaleString()}</p>
        <p><strong>Fənn ID:</strong> {lesson.subjectId}</p>
        <p><strong>Sinif ID:</strong> {lesson.classId}</p>
        <p><strong>Müəllim ID:</strong> {lesson.teacherId}</p>
        <p><strong>Tapşırıq:</strong> {lesson.task}</p>

        {lesson.videoUrl && (
          <div className="mt-4">
            <strong>Video:</strong>
            <video controls className="w-100 mt-2" src={lesson.videoUrl} />
          </div>
        )}

        {lesson.studentsProgress?.length > 0 && (
          <div className="mt-4">
            <h5>Proqreslər</h5>
            <ul>
              {lesson.studentsProgress.map((s, i) => (
                <li key={i}>
                  👤 {s.studentId} — ✅ {s.result} — 💬 {s.feedback}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default ViewLesson;
