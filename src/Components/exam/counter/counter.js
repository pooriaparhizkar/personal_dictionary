import React, { useEffect, useState } from "react";
import "./counter.scss";

export default function ExamCounter(props) {
  const [number, setNumber] = useState(3);
  useEffect(() => {
    // Exit early if countdown is finished
    if (number <= 0) {
      props.onFinish();
      return;
    }

    // Set up the timer
    const timer = setInterval(() => {
      setNumber((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Clean up the timer
    return () => clearInterval(timer);
  }, [number]);

  return (
    <div className="exam-counter">
      {number === 3 && <label>3</label>}
      {number === 2 && <label>2</label>}
      {number === 1 && <label>1</label>}
    </div>
  );
}
