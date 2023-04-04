import { Row, Button } from "react-bootstrap";
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const changeCounter = (i) => {
    setCount((count) => count + i);
  };
  let span;
  if (count > 0) {
    span = "Positive";
  }
  if (count < 0) {
    span = "Negative";
  }
  if (count === 0) {
    span = "Zero";
  }
  return (
    <Row className="justify-content-center">
      <div className="d-flex justify-content-center align-items-center gap-4 mb-3">
        <Button onClick={() => changeCounter(1)}>+1</Button>
        <span>{count}</span>
        <Button onClick={() => changeCounter(-1)}>-1</Button>
      </div>
      <span className="d-flex justify-content-center">{span}</span>
    </Row>
  );
}

export default Counter;
