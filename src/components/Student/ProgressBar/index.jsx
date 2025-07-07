import React from "react";
import { ProgressBar as BSProgress } from "react-bootstrap";

const ProgressBar = ({ current, total }) => {
  const now = (current / total) * 100;
  return (
    <div className="my-3">
      <BSProgress now={now} label={`${current}/${total}`} />
    </div>
  );
};

export default ProgressBar;