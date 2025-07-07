import React from "react";
import { Button, Card } from "react-bootstrap";

const ResultCard = ({ score, total, onRestart }) => {
  return (
    <Card className="text-center p-4 shadow">
      <h3>🎉 Quiz Finished!</h3>
      <p className="my-3">Your Score: <strong>{score} / {total}</strong></p>
      <Button onClick={onRestart}>Restart Quiz</Button>
    </Card>
  );
};

export default ResultCard;