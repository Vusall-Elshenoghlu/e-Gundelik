import React, { useEffect, useState } from "react";

const Timer = ({ duration, onTimeout, isRunning }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft === 0) {
      onTimeout();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isRunning]);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  return (
    <div className="text-end text-muted">
      ⏳ {timeLeft}s left
    </div>
  );
};

export default Timer