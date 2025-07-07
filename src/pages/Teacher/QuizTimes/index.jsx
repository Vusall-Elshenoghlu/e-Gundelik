import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner } from "react-bootstrap";

const QuizTimes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://turansalimli-001-site1.ntempurl.com/api/Quiz/GetAllQuizzes")
      .then((res) => {
        setQuizzes(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Quiz-lər alınmadı:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="p-4"
      style={{
        maxWidth: "calc(100vw - 300px)",
        marginLeft: "300px",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        boxSizing: "border-box",
      }}
    >
      <h3 className="mb-4 text-primary fw-bold">
        Quiz Vaxtları
      </h3>

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
                <th>Quiz Adı</th>
                <th>Başlanma Tarixi</th>
                <th>Bitmə Tarixi</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.length > 0 ? (
                quizzes.map((quiz, index) => (
                  <tr key={quiz.id}>
                    <td>{index + 1}</td>
                    <td>{quiz.name}</td>
                    <td>{new Date(quiz.startDate).toLocaleString()}</td>
                    <td>{new Date(quiz.endDate).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-muted py-4">
                    Quiz tapılmadı.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default QuizTimes;
