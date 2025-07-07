// CheckYourself.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Container,
    Form,
    Row,
    Col,
    Spinner,
} from 'react-bootstrap';
import styles from './CheckYourself.module.css';
import QuestionCard from '../../../components/Student/QuestionCard';
import ProgressBar from '../../../components/Student/ProgressBar';
import Timer from '../../../components/Student/Timer';
import ResultCard from '../../../components/Student/ResultCard';

const CheckYourself = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [startPage, setStartPage] = useState('');
    const [endPage, setEndPage] = useState('');
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleFetchQuestions = async () => {
        if (!pdfFile || !startPage || !endPage) {
            alert("Zəhmət olmasa bütün xanaları doldurun.");
            return;
        }

        setLoading(true);
        setQuestions([]);

        const formData = new FormData();
        formData.append('pdf', pdfFile);
        formData.append('starPage', startPage);
        formData.append('endPage', endPage);

        try {
            const response = await axios.post(
                'https://turansalimli-001-site1.ntempurl.com/api/AI/GetQuestions',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log(response.data)
            setQuestions(response.data);
        } catch (error) {
            alert('Sual yüklənərkən xəta baş verdi.');
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerClick = (index) => {
        setSelectedAnswer(index);
        if (index === questions[currentQIndex].correctIndex) {
            setScore((prev) => prev + 1);
        }
    };

    useEffect(() => {
        if (selectedAnswer !== null) {
            const timer = setTimeout(() => {
                if (currentQIndex + 1 < questions.length) {
                    setCurrentQIndex((prev) => prev + 1);
                    setSelectedAnswer(null);
                } else {
                    setShowResult(true);
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [selectedAnswer]);

    const handleTimeout = () => {
        if (selectedAnswer === null) {
            setSelectedAnswer(-1);
            setTimeout(() => {
                if (currentQIndex + 1 < questions.length) {
                    setCurrentQIndex((prev) => prev + 1);
                    setSelectedAnswer(null);
                } else {
                    setShowResult(true);
                }
            }, 1000);
        }
    };

    const restartQuiz = () => {
        setCurrentQIndex(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setQuestions([]);
        setPdfFile(null);
        setStartPage('');
        setEndPage('');
    };

    return (
        <Container className={`py-5 ${styles.quizContainer}`}>
            <h2 className="text-center mb-4">Özünü Yoxla</h2>

            {questions.length === 0 ? (
                <Form>
                    <Form.Group controlId="pdfFile">
                        <Form.Label>PDF faylını seç</Form.Label>
                        <Form.Control
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => setPdfFile(e.target.files[0])}
                        />
                    </Form.Group>

                    <Row className="mt-3">
                        <Col md={6}>
                            <Form.Group controlId="startPage">
                                <Form.Label>Başlanğıc səhifə</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={startPage}
                                    onChange={(e) => setStartPage(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="endPage">
                                <Form.Label>Son səhifə</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={endPage}
                                    onChange={(e) => setEndPage(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="text-center mt-4">
                        <Button onClick={handleFetchQuestions} disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : 'Başla'}
                        </Button>
                    </div>
                </Form>
            ) : !showResult ? (
                <>
                    <ProgressBar current={currentQIndex + 1} total={questions.length} />
                    <Timer
                        duration={60}
                        isRunning={selectedAnswer === null}
                        onTimeout={handleTimeout}
                    />
                    <QuestionCard
                        questionObj={questions[currentQIndex]}
                        questionNumber={currentQIndex + 1}
                        totalQuestions={questions.length}
                        onAnswerClick={handleAnswerClick}
                        selectedAnswerIndex={selectedAnswer}
                        isAnswered={selectedAnswer !== null}
                    />
                </>
            ) : (
                <ResultCard
                    score={score}
                    total={questions.length}
                    onRestart={restartQuiz}
                />
            )}
        </Container>
    );
};

export default CheckYourself;
